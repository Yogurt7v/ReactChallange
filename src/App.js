import * as React from 'react';

export function useDocumentTitle(newTitle) {
  const [title, setTitle] = React.useState('First title');

  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return {
    title,
    changeTitle,
  };
}

export default function App() {
  const [inputValue, setInputValue] = React.useState('');
  const [count, setCount] = React.useState(0);
  const { title, changeTitle } = useDocumentTitle();

  const clickButton = (secondValue) => {
    if (!secondValue) {
      setCount((prev) => prev + 1);
    } else {
      changeTitle(secondValue);
      setCount((prev) => prev + 1);
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <input
        type="text"
        placeholder="new value"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button onClick={() => clickButton(inputValue)}>Increment count: {count}</button>
    </>
  );
}
