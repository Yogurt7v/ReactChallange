export default function App() {
  function handleChange(e) {
    if (e.target.value.length > 10) {
      alert('Character limit exceeded');
    }
  }

  return (
    <section>
      <h1>Character Limit</h1>
      <input placeholder="Enter some text" onChange={(e) => handleChange(e)} />
    </section>
  );
}
