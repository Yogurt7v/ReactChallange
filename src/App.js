import { useState } from 'react';

export default function App() {
  const [mode, setMode] = useState('dark');

  const handleChange = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  return (
    <main className={mode}>
      <button onClick={handleChange}>Activate {mode} theme</button>
    </main>
  );
}
