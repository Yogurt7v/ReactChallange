import * as React from 'react';

export default function CountryInfo() {
  const [countryCode, setCountryCode] = React.useState('AU');
  const [data, setData] = React.useState({
    data: null,
    isLoading: true,
    error: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCountryCode(value);
  };

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((r) => r.json());

      return setData({ ...data, data: res[0], isLoading: false });
    }
    fetchData();
  }, [countryCode, data]);

  return (
    <section>
      <header>
        <h1>Country Info:</h1>

        <label htmlFor="country">Select a country:</label>
        <div>
          <select id="country" value={countryCode} onChange={handleChange}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States of America</option>
          </select>
          {data.isLoading && <span>Loading...</span>}
          {data.error && <span>{data.error.message}</span>}
        </div>
      </header>
      <p>Capital: {data.data.capital}</p>
      <p>Population : {data.data.population.toLocaleString('ru-Ru')}</p>
    </section>
  );
}
