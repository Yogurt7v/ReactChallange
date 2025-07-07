import * as React from 'react';

export function useWindowSize() {
  const [size, setSize] = React.useState({
    height: 0,
    width: 0,
  });

  React.useLayoutEffect(() => {
    const handleChange = () =>
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    handleChange();
    window.addEventListener('resize', handleChange);
    return () => {
      window.removeEventListener('resize', handleChange);
    };
  }, []);

  return size;
}

export default function App() {
  const { width, height } = useWindowSize();
  return (
    <>
      <div className="wrapper">
        <h1>useWindowSize</h1>
        <p>Resize the window</p>
        <div>width: {width}</div>
        <div>height: {height}</div>
      </div>
    </>
  );
}
