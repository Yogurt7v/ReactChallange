import * as React from 'react';

function TextInput() {
  const ref = React.useRef(null);

  React.useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <div>
      <h1>Autofocus Input</h1>
      <label htmlFor="focus">Email Address</label>
      <input id="focus" type="email" placeholder="Enter your email" ref={ref} />
    </div>
  );
}

export default function App() {
  return TextInput();
}
