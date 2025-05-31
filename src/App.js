import * as React from 'react';

export default function FollowTheLeader() {
  const [position, setPosition] = React.useState([0, 0]);

  const handleClick = (e) => {
    setPosition([e.clientX, e.clientY]);
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', (e) => handleClick(e));

    return () => document.removeEventListener('mousedown', handleClick);
  }, [position]);

  return (
    <div className="wrapper">
      <div
        className="box"
        style={{
          transform: `translate(${position[0]}px, ${position[1]}px)`,
          transition: 'transform 1s',
        }}
      />
    </div>
  );
}
