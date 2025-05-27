import * as React from 'react';

export function Clock() {
  const [time, setTime] = React.useState(null);
  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, [time, setTime]);

  if (time === null) return null;

  return (
    <section>
      <h1>Current Time</h1>
      <p>{time.toLocaleTimeString()}</p>
    </section>
  );
}

export default function App() {
  return Clock();
}
