import * as React from 'react';

export function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = React.useCallback((newList) => setList(newList), []);

  const push = React.useCallback((newOne) => setList([...list, newOne]), [list]);

  const removeAt = React.useCallback(
    (n) => setList(list.filter((_, index) => index !== n - 1)),
    [list]
  );

  const insertAt = React.useCallback(
    (n, value) => {
      const copy = [...list];
      copy.splice(n, 0, value);
      setList(copy);
    },
    [list]
  );

  const updateAt = React.useCallback(
    (n, value) => {
      const copy = [...list];
      copy.splice(n, 1, value);
      setList(copy);
    },
    [list]
  );

  const clear = () => setList([]);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}

export default function App() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList();

  const [newValue, setNewValue] = React.useState('');

  return (
    <div className="wrapper">
      <h1>UseList</h1>
      <div className="links">
        <button onClick={() => insertAt(1, 777)}>Insert After First</button>
        <button onClick={() => removeAt(2)}>Remove Second Item</button>
        <button onClick={() => set([1, 2, 3])}>Set([1,2,3])</button>
        <button onClick={clear}>Clear</button>
      </div>

      <div className="input">
        <input
          type="text"
          placeholder="Add new"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button
          onClick={() => {
            push(newValue);
            setNewValue('');
          }}
          disabled={newValue.length <= 0 ? true : false}
        >
          Add
        </button>
      </div>

      <div className="result">
        {list.map((item, index) => (
          <div className="item" key={index}>
            <div>{item}</div>
            <button onClick={() => updateAt(index, 'newOne')}>Edit</button>
            <button onClick={() => removeAt(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
