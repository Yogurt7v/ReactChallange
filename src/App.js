import * as React from 'react';

export default function ReactRuler() {
  const [width, setWidth] = React.useState(0);

  const ref = React.useRef(null);

  React.useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.borderBoxSize[0].inlineSize);
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <h1>React Ruler</h1>
      <p>(Resize the ruler)</p>
      <article ref={ref}>
        <label>width: {Math.floor(width)}</label>
      </article>
    </section>
  );
}
