import * as React from 'react';

React.useEffectEvent = React.experimental_useEffectEvent;

export function useContinuousRetry(callback, interval = 100, options = {}) {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = React.useState(false);

  const onInterval = React.useEffectEvent(callback);

  React.useEffect(() => {
    let retries = 0;

    const letsTry = () => {
      setInterval(() => {
        if (onInterval()) {
          setHasResolved(true);
          clearInterval(letsTry);
          retries++;
        } else if (retries >= maxRetries) {
          clearInterval(letsTry);
        } else {
          retries += 1;
        }
      }, interval);
    };

    letsTry();

    return () => clearInterval(letsTry);
  }, [interval, maxRetries, onInterval]);

  return hasResolved;
}

export default function App() {
  const [count, setCount] = React.useState(0);
  const hasResolved = useContinuousRetry(
    () => {
      console.log('retrying');
      return count > 10;
    },
    1000,
    { maxRetries: 5 }
  );

  return (
    <section>
      <h1>useContinuousRetry</h1>
      <button
        className="primary"
        onClick={() => setCount(count + 1)}
        disabled={hasResolved}
      >
        {count}
      </button>
      <pre>{JSON.stringify({ hasResolved, count }, null, 2)}</pre>
    </section>
  );
}
