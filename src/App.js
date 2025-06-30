import * as React from 'react';

export function useToggle(initialValue = true) {
  const [on, setOn] = React.useState(() => {
    if (typeof initialValue === Boolean) {
      return initialValue;
    }

    return Boolean(initialValue);
  });

  const toggle = (value) => {
    if (typeof value === Boolean) {
      return setOn(value);
    }
    return setOn((v) => !v);
  };

  return [on, toggle];
}

function ToggleDemo({ on, toggle }) {
  return (
    <div>
      <label className="toggle">
        <input
          onChange={toggle}
          className="toggle-checkbox"
          type="checkbox"
          checked={on}
        />
        <div className="toggle-switch"></div>
        <span className="toggle-label">{on ? 'On' : 'Off'}</span>
      </label>
    </div>
  );
}

export default function App() {
  const [on, toggle] = useToggle(true);

  return (
    <>
      <section>
        <h1>UseToggle</h1>
        <button disabled={on} className="link" onClick={() => toggle(true)}>
          Turn On
        </button>
        <button disabled={!on} className="link" onClick={() => toggle(false)}>
          Turn Off
        </button>
        <button className="link" onClick={toggle}>
          Toggle
        </button>
        <button className="link" onClick={() => toggle(!on)}>
          (Also toggles)
        </button>
        <ToggleDemo toggle={toggle} on={on} />
      </section>
    </>
  );
}
