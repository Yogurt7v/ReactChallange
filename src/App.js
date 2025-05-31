import * as React from 'react';

const translations = {
  en: {
    hello: 'Hello!',
    welcome: 'Welcome to our app!',
  },
  es: {
    hello: '¡Hola!',
    welcome: '¡Bienvenido a nuestra aplicación!',
  },
  fr: {
    hello: 'Bonjour !',
    welcome: 'Bienvenue dans notre application !',
  },
  de: {
    hello: 'Hallo!',
    welcome: 'Willkommen in unserer App!',
  },
};

const languageContext = React.createContext({
  language: 'en',
  changeLanguage: () => {},
  translation: (key) => key,
});

function LanguageProvider() {
  const [language, setLanguage] = React.useState(Object.keys(translations)[0]);
  const [text, setText] = React.useState(Object.values(translations)[0]);

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const translation = () => {
    setText(translations[language]);
  };

  return (
    <>
      <select
        defaultValue={Object.keys(translations)[0]}
        onChange={(e) => changeLanguage(e)}
      >
        {Object.keys(translations).map((item) => (
          <option value={item}>{item}</option>
        ))}
      </select>
      <div>{text.hello}</div>
      <div>{text.welcome}</div>
      <button onClick={translation}>Translate</button>
    </>
  );
}

export default function App() {
  return LanguageProvider();
}
