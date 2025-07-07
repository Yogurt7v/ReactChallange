import * as React from 'react';

export function useWindowSize() {
  const [height, setHeight] = React.useState(() => window.innerHeight);
  const [width, setWidth] = React.useState(() => window.innerWidth);

  React.useEffect(() => {
    const handleChange = () =>
      window.addEventListener('resize', () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      });
    handleChange();
    return window.removeEventListener('resize', handleChange);
  }, [height, width]);

  return {
    height,
    width,
  };
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
