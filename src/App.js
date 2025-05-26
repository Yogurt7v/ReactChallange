function handleChange(event, characterLimit) {
  if (event.target.value.length > characterLimit) {
    alert('Character limit exceeded');
  }
}

function Input({ characterLimit }) {
  return (
    <input
      onChange={(e) => handleChange(e, characterLimit)}
      placeholder="Enter some text"
    />
  );
}

export default function App() {
  return (
    <section>
      <h1>Character Limit</h1>
      <Input characterLimit={20} />
    </section>
  );
}
