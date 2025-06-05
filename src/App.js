import * as React from 'react';

const initialState = {
  past: [],
  present: 0,
  future: [],
};

function reducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case 'inc':
      return {
        past: [...past, present],
        present: present + 1,
        future: [],
      };
    case 'desc':
      return {
        past: [...past, present],
        present: present - 1,
        future: [],
      };

    case 'undo':
      return {
        past: past.slice(0, -1),
        present: past.at(-1),
        future: [present, ...future],
      };
    case 'redo':
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1),
      };
    default:
      return;
  }
}

export function CounterWithUndoRedo() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleIncrement = () => {
    dispatch({ type: 'inc' });
  };
  const handleDecrement = () => {
    dispatch({ type: 'desc' });
  };
  const handleUndo = () => {
    dispatch({ type: 'undo' });
  };
  const handleRedo = () => {
    dispatch({ type: 'redo' });
  };

  return (
    <>
      <h1>Counter: {state.present}</h1>
      <div className="container">
        <button className="link" onClick={handleIncrement}>
          Increment
        </button>
        <button className="link" onClick={handleDecrement}>
          Decrement
        </button>
        <button className="link" onClick={handleUndo} disabled={!state.past.length}>
          Undo
        </button>
        <button className="link" onClick={handleRedo} disabled={!state.future.length}>
          Redo
        </button>
      </div>
    </>
  );
}

export default function App() {
  return CounterWithUndoRedo();
}
