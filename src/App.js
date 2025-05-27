import * as React from 'react';

export default function App() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount((prev) => prev + 1);
  }
  function decrement() {
    setCount((prev) => prev - 1);
  }

  return (
    <main>
      <span>{count}</span>
      <div>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
      </div>
    </main>
  );
}
