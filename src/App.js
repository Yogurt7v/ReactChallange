import * as React from 'react';
import { fetchData } from './utils';

export function DataTable() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('asc');

  const handleHeaderClick = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  React.useEffect(() => {
    let result = fetchData();

    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.id - a.id);
    }

    setData(result);
  }, [sortOrder, searchTerm, setSortOrder]);

  return (
    <div>
      <header>
        <input
          placeholder="Search items"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="secondary">Toggle Columns</button>
      </header>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <button id="id" onClick={() => handleHeaderClick()}>
                ID
              </button>
            </th>
            <th id="name">Name</th>
            <th id="name">Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  return DataTable();
}
