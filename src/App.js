import * as React from 'react';

// Полифилл для useEffectEvent (если используется React < 18.3)
if (!React.useEffectEvent) {
  React.useEffectEvent = (fn) => fn;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function useRandomInterval(callback, { minDelay, maxDelay }) {
  const savedCallback = React.useRef(callback);
  const timeoutId = React.useRef(null);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const handleClearInterval = React.useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  React.useEffect(() => {
    function tick() {
      const interval = getRandomNumber(minDelay, maxDelay);
      timeoutId.current = setTimeout(() => {
        savedCallback.current();
        tick();
      }, interval);
    }

    if (minDelay !== null && maxDelay !== null) {
      tick();
    }

    return handleClearInterval;
  }, [minDelay, maxDelay, handleClearInterval]);

  return handleClearInterval;
}

export default function App() {
  const [isActive, setIsActive] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const stopInterval = useRandomInterval(
    () => {
      setCount((c) => c + 1);
      console.log('Interval tick');
    },
    { minDelay: 400, maxDelay: 2000 }
  );

  const toggleInterval = () => {
    setIsActive(!isActive);
    if (isActive) {
      stopInterval();
    }
  };

  return (
    <div>
      <h2>useRandomInterval</h2>
      <p>Count: {count}</p>
      <button onClick={toggleInterval}>{isActive ? 'Stop' : 'Start'}</button>
    </div>
  );
}
