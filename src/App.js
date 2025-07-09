import * as React from 'react';
export function useList(defaultList = []) {
  const [list, setList] = React.useState(defaultList);

  const set = () => setList([1, 2, 3]);

  const push = (newOne) => setList([...list, newOne]);

  const removeAt = (n) => setList(list.filter((item, index) => index !== n - 1));

  const insertAt = (n, value) => {
    const copy = [...list];
    copy.splice(n, 0, value);
    setList(copy);
  };

  const updateAt = (n, value) => {
    const copy = [...list];
    copy.splice(n, 1, value);
    setList(copy);
  };

  const clear = () => setList([]);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
}

export default function App() {
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([
    'First',
    'Second',
    'Third',
  ]);

  const [newValue, setNewValue] = React.useState('');

  return (
    <div className="wrapper">
      <h1>UseList</h1>
      <div className="links">
        <button onClick={() => insertAt(1, 777)}>Insert After First</button>
        <button onClick={() => removeAt(2)}>Remove Second Item</button>
        <button onClick={set}>Set([1,2,3])</button>
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
