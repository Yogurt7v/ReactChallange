import * as React from 'react';

function Layout() {
  return (
    <div className="box">
      <header className="header">Header</header>
      <main className="main">Main</main>
      <aside className="aside">Aside</aside>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default function App() {
  return <Layout />;
}
