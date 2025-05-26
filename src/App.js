function List() {
  const friends = ['Ben', 'Lynn', 'Alex'];

  return (
    <ul>
      {friends.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default function App() {
  return <List />;
}
