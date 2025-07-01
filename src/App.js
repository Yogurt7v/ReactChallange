import * as React from 'react';

const subscribe = (callback) => {
  window.addEventListener('languagechange', callback);
  return () => window.removeEventListener('languagechange', callback);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  throw Error('usePreferredLanguage is a client only');
};

export function usePreferredLanguage() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
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
