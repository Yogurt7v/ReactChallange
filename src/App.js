import * as React from 'react';

const query = 'only screen and (max-width : 768px)';

export default function MatchMedia() {
  const [isMobile, setIsMobile] = React.useState(window.matchMedia(query).matches);

  React.useLayoutEffect(() => {
    const handleChange = () => {
      setIsMobile(window.matchMedia(query).matches);
    };

    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <section>
      Resize your browser's window to see changes.
      <article>
        <figure className={isMobile ? 'active' : ''}>
          phone
          <figcaption>Is mobile: {`${isMobile}`}</figcaption>
        </figure>

        <figure className={!isMobile ? 'active' : ''}>
          desktop
          <figcaption>Is larger device: {`${!isMobile}`}</figcaption>
        </figure>
      </article>
    </section>
  );
}
