import * as React from 'react';

export function useDebounce(value, delay) {
  const [newValue, setNewValue] = React.useState(value);

  React.useEffect(() => {
    const timer = () => setTimeout(() => setNewValue(value), delay);

    timer();
    return () => clearTimeout(timer);
  }, [value, delay, newValue]);

  return newValue;
}

export default function App() {
  const [value, setValue] = React.useState('');
  const debouncedValue = useDebounce(value, 1000);

  return (
    <div className="wrapper">
      <h1>useDebounce</h1>
      <div className="input" value={value} onChange={(e) => setValue(e.target.value)}>
        <input type="text" placeholder="search" />
        <button>Search</button>
      </div>

      {debouncedValue}
    </div>
  );
}
