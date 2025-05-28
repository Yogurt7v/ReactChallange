import * as React from 'react';

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="container">
      <h1>Video Player</h1>
      <article>
        <video
          poster="https://image.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/thumbnail.webp"
          ref={videoRef}
        >
          <source
            src="https://stream.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/high.mp4"
            type="video/mp4"
          />
          Ваш браузер не поддерживает видео.
        </video>
        <div>
          <button title={isPlaying ? 'Pause' : 'Play'} onClick={handleTogglePlay}>
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </article>
    </section>
  );
}

export default function App() {
  return VideoPlayer();
}
