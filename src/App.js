import { type } from '@testing-library/user-event/dist/type';
import * as React from 'react';

const isPlainObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]';
};

export function useObjectState(initialValue) {
  const [state, setState] = React.useState(initialValue);

  const handleUpdate = React.useCallback((arg) => {
    if (isPlainObject(arg)) {
      setState((s) => ({
        ...s,
        ...arg,
      }));
    }
    if (typeof arg === 'function') {
      setState((s) => {
        const newState = arg(s);

        if (isPlainObject(newState)) {
          return {
            ...s,
            ...newState,
          };
        }
      });
    }
  }, []);

  return [state, handleUpdate];
}

export default function App() {
  const [state, setState] = useObjectState({
    team: 'Utah Jazz',
    wins: 1238,
    loses: 1789,
    champs: 0,
  });

  return (
    <div className="wrapper">
      <h1>useObjectState</h1>
      <div className="buttons">
        <button onClick={() => setState((s) => ({ wins: s.wins + 1 }))}>Add Win</button>
        <button onClick={() => setState((s) => ({ loses: s.loses + 1 }))}>
          Add Lose
        </button>
        <button onClick={() => setState((s) => ({ champs: s.champs + 1 }))}>
          Add Championship
        </button>
        <button
          onClick={() =>
            setState({
              team: 'KF',
              wins: 0,
              loses: 0,
              champs: 0,
            })
          }
        >
          Reset
        </button>
      </div>
      <div className="table">
        <td>
          TEAM <tr>{state.team}</tr>
        </td>

        <td>
          WINS
          <tr>{state.wins}</tr>
        </td>
        <td>
          LOSSES
          <tr>{state.loses}</tr>
        </td>
        <td>
          Championships
          <tr>{state.champs}</tr>
        </td>
      </div>
    </div>
  );
}
