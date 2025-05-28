import * as React from 'react';

function FieldNotes() {
  const [notes, setNotes] = React.useState([
    'Components encapsulate both the visual representation of a particular piece of UI as well as the state and logic that goes along with it.',
    'The same intuition you have about creating and composing together functions can directly apply to creating and composing components. However, instead of composing functions together to get some value, you can compose components together to get some UI.',
    'JSX combines the power and expressiveness of JavaScript with the readability and accessibility of HTML',
    'Just like a component enabled the composition and reusability of UI, hooks enabled the composition and reusability of non-visual logic.',
  ]);

  const notesRefs = React.useRef(null);
  const otherRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newNote = formData.get('note');
    setNotes([...notes, newNote]);
  };

  React.useEffect(() => {
    notesRefs.current.className = 'big';
    otherRef.current.className = '';
  }, [notes]);

  return (
    <article>
      <h1>Field Notes</h1>
      <div>
        <ul>
          {notes.map((msg, index) => {
            return (
              <li key={index} ref={index === notes.length - 1 ? notesRefs : otherRef}>
                {msg}
              </li>
            );
          })}
        </ul>
        <form onSubmit={handleSubmit}>
          <input required type="text" name="note" placeholder="Type your note..." />
          <button className="link" type="submit">
            Submit
          </button>
        </form>
      </div>
    </article>
  );
}

export default function App() {
  return FieldNotes();
}
