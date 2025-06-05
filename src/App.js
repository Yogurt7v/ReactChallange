import * as React from 'react';

export function LocalizedPrimeNumbers() {
  const [count, setCount] = React.useState(1);
  const [locale, setLocal] = React.useState('en-US');

  const translations = {
    'en-US': {
      nextPrime: `фраза по английски ${count}, ${count + 1}`,
    },
    'es-ES': {
      nextPrime: `фраза по испански ${count}, ${count + 1}`,
    },
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleLocaleChange = (e) => {
    setLocal(e.target.value);
  };
  function calculatePrime(num) {
    return num++;
  }
  function formatNumberToString(count, locale) {
    return count.toLocaleString(locale);
  }

  const nthprime = calculatePrime(count);

  return (
    <div>
      <header>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español (ES)</option>
        </select>

        <button className="primary" onClick={handleClick}>
          {translations[locale].nextPrime}
        </button>
      </header>
    </div>
  );
}

export default function App() {
  return LocalizedPrimeNumbers();
}
