import * as React from 'react';

export function ClickOutside() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dialog = React.useRef(null);

  React.useEffect(() => {
    const handlePointer = (e) => {
      if (e.target !== dialog.current) {
        handleCloseModal();
      }
    };
    document.addEventListener('pointerdown', (e) => handlePointer(e));

    return () => document.removeEventListener('pointerdown', handlePointer);
  }, []);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section>
        <h1>Click Outside</h1>
        <button className="link" onClick={handleOpenModal}>
          Open Modal
        </button>
      </section>
      {isOpen && (
        <dialog ref={dialog}>
          <button onClick={handleCloseModal}>X</button>
          <h2>Modal</h2>
          <p>Click outside the modal to close (or use the button) whatever you prefer.</p>
        </dialog>
      )}
    </>
  );
}

export default function App() {
  return ClickOutside();
}
