import * as React from 'react';

const initialState = {
  past: [],
  present: null,
  future: [],
};

const reducer = (state, action) => {
  const { past, present, future } = state;

  if (action.type === 'UNDO') {
    return {
      past: past.slice(0, past.length - 1),
      present: past[past.length - 1],
      future: [present, ...future],
    };
  } else if (action.type === 'REDO') {
    return {
      past: [...past, present],
      present: future[0],
      future: future.slice(1),
    };
  } else if (action.type === 'SET') {
    const { newPresent } = action;

    if (action.newPresent === present) {
      return state;
    }

    return {
      past: [...past, present],
      present: newPresent,
      future: [],
    };
  } else if (action.type === 'CLEAR') {
    return {
      initialState,
    };
  } else {
    return state;
  }
};

export function useHistoryState(defaultState) {
  const [state, newState] = React.useState(defaultState);

  const set = (newTodo) => {
    newState(reducer(state, { type: 'SET', newPresent: newTodo }));
  };

  const undo = () => {
    newState(reducer(state, { type: 'UNDO' }));
  };

  const redo = () => {
    newState(reducer(state, { type: 'REDO' }));
  };
  const clear = () => {
    newState(reducer(state, { type: 'CLEAR' }));
  };

  const canUndo = () => state?.past?.length > 0;

  const canRedo = () => state?.future?.length > 0;

  return { state, canUndo, canRedo, set, undo, redo, clear };
}

export default function App() {
  const { state, canUndo, canRedo, set, undo, redo, clear } =
    useHistoryState(initialState);

  const [newTodo, setNewTodo] = React.useState('');

  return (
    <div className="wrapper">
      <h2>useHistoryState</h2>
      <div className="buttons">
        <button onClick={() => undo()} disabled={!canUndo()}>
          Undo
        </button>
        <button onClick={() => redo()} disabled={!canRedo()}>
          Redo
        </button>
        <button onClick={() => clear()}>Clear</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Add new TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={() => {
            set(newTodo);
            setNewTodo('');
          }}
        >
          Add
        </button>
      </div>
      <p>{state.present}</p>
    </div>
  );
}
