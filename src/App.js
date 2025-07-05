import * as React from 'react';

export function useCounter(startingValue = 0, options = {}) {
  const { min, max } = options;

  if (typeof min === 'number' && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (typeof max === 'number' && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = React.useState(startingValue);

  const increment = React.useCallback(() => {
    let val = count + 1;
    if (val <= max) {
      setCount(val);
    }
  }, [max, count]);

  const decrement = React.useCallback(() => {
    let val = count - 1;
    if (val >= min) {
      setCount(val);
    }
  }, [min, count]);

  const set = (nextState) => {
    if (nextState >= min && nextState <= max) {
      setCount(nextState);
    }
  };

  const reset = () => {
    setCount(startingValue);
    console.log('reset', count);
  };

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
}

export default function App() {
  const [count, { increment, decrement, set, reset }] = useCounter(6, {
    min: 5,
    max: 10,
  });

  return (
    <>
      <div className="wrapper">
        <h2>UseCounter</h2>
        <div>с опциональным мин/макс</div>
        <div className="buttonWrapper">
          <button onClick={() => increment()}>Increment</button>
          <button onClick={() => decrement()}>Decrement</button>
          <button onClick={() => set(9)}>Set to 9</button>
          <button onClick={() => reset()}>Reset</button>
        </div>
        <h1>{count}</h1>
      </div>
    </>
  );
}
