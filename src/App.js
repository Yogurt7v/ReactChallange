import * as React from 'react';

export default function ExpandingTextarea() {
  const [text, setText] = React.useState('');
  const textZone = React.useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
    const textarea = textZone.current;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  };

  return (
    <section className="container">
      <h1>Expanding Textarea</h1>
      <label htmlFor="textarea">Enter or paste in some text</label>
      <textarea
        ref={textZone}
        id="textarea"
        placeholder="Enter some text"
        value={text}
        onChange={handleChange}
        rows={1}
      />
    </section>
  );
}
