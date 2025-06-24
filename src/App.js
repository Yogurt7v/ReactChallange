import * as React from 'react';

export function useDocumentTitle(newTitle) {
  React.useEffect(() => {
    document.title = newTitle;
  }, [newTitle]);
}

export default function App() {
  const [count, setCount] = React.useState(0);
  useDocumentTitle(`new title ${count}`);

  const click = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <>
      <h2>Change title! Look! {count}</h2>
      <button onClick={() => click(count)}>Increment count: {count}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}
