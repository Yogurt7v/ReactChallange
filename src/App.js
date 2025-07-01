import React, { useCallback, useRef, useState } from 'react';

function oldSchoolCopy(text) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

export function useCopyToClipboard() {
  const [text, setText] = useState();

  const handleCopy = useCallback((val) => {
    const asyncCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(val);
          setText(val);
        } else {
          throw new Error('No Navigator');
        }
      } catch (e) {
        oldSchoolCopy(val);
        setText(val);
      }
    };
    asyncCopy();
  }, []);

  return [text, handleCopy];
}

const randomHash = crypto.randomUUID();

export default function App() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  console.log('Скопированный текст', copiedText);
  return (
    <section>
      <h1>useCopyToClipboard</h1>
      <article>
        <label>Fake API Key</label>
        <pre>
          <code>{randomHash}</code>
          <button ton className="link" onClick={() => copyToClipboard(randomHash)} />
        </pre>
      </article>
    </section>
  );
}
