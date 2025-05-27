import * as React from 'react';

const items = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Fig',
  'Grape',
  'Honeydew',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Raspberry',
  'Strawberry',
  'Watermelon',
];

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    const result = items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(result);
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Filter</h1>
      <input
        type="text"
        placeholder="Search params"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSearchTerm('')}>X</button>

      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return SearchFilter();
}
