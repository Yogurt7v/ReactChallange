import * as React from 'react';

export function useVisibilityChange() {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const visible = () => {
      document.addEventListener('visibilitychange', () => {
        document.visibilityState === 'visible' ? setIsVisible(true) : setIsVisible(false);
      });
    };

    visible();

    return () => document.removeEventListener('visibilitychange', visible);
  }, []);

  return isVisible;
}

export default function App() {
  const documentVisible = useVisibilityChange();

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (documentVisible) {
      setCount(count + 1);
    }
  }, [documentVisible]);

  return (
    <div className="wrapper">
      <h1>useVisibilityChange</h1>
      <p>Tab is visible Count: {count}</p>
    </div>
  );
}
