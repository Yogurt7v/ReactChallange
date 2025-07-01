import * as React from 'react';

export function usePreferredLanguage() {
  const [lang, setLang] = React.useState(() => navigator.language);

  const handler = () => setLang(navigator.language);

  React.useEffect(() => {
    window.addEventListener('languagechange', handler);

    return () => {
      window.removeEventListener('languagechange', handler);
    };
  }, []);

  return lang;
}

export default function App() {
  const language = usePreferredLanguage();
  const date = new Date().toLocaleString(`${language}`);

  return (
    <>
      <div className="container">
        <h1>usePreferredLanguage</h1>
        <div>
          You can change your preferred language here - chrome://settings/languages
        </div>
        <div>{`The correct date format for ${language} is ${date}`}</div>
      </div>
    </>
  );
}
