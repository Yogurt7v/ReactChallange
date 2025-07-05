import * as React from 'react';

export function useTimeout(cb, ms) {
  const id = React.useRef(null);

  const handleClearTimeout = React.useCallback(() => {
    window.clearTimeout(id);
  }, []);

  React.useEffect(() => {
    id.current = window.setInterval(cb, ms);

    return handleClearTimeout;
  }, [cb, ms, handleClearTimeout]);

  return handleClearTimeout;
}

function Bomb({ hasExploded, hasDefused, handleClick }) {
  if (hasExploded) {
    return (
      <figure>
        <span role="img" aria-label="Explosion Emoji">
          💥
        </span>
        <figcaption>You lose</figcaption>
      </figure>
    );
  }

  if (hasDefused) {
    return (
      <figure>
        <span role="img" aria-label="Explosion Emoji">
          🎉
        </span>
        <figcaption>You Win</figcaption>
      </figure>
    );
  }

  return (
    <button className="bomb" onClick={handleClick}>
      <span role="img" aria-label="Dynamite Emoji">
        🧨
      </span>
    </button>
  );
}

export default function App() {
  const [hasDefused, setHasDefused] = React.useState(false);
  const [hasExploded, setHasExploded] = React.useState(false);

  const clear = useTimeout(() => {
    setHasExploded(!hasExploded);
  }, 1000);

  const handleClick = () => {
    clear();
    setHasDefused(true);
  };

  return (
    <section>
      <h1>useTimeout</h1>
      <p>You have 1s to defuse (click) the bomb or it will explode </p>
      <button
        className="link"
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload
      </button>
      <Bomb hasDefused={hasDefused} hasExploded={hasExploded} handleClick={handleClick} />
    </section>
  );
}
