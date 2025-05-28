import * as React from 'react';

const fetchData = async ({ query = '', page = 0, tag = '' }) => {
  return fetch(
    `https://hn.algolia.com/api/v1/search?query=${query}&tags=${encodeURIComponent(
      tag
    )}&page=${page}`
  )
    .then((response) => response.json())
    .then((json) => ({
      results: json.hits || [],
      pages: json.nbPages || 0,
      resultsPerPage: json.hitsPerPage || 20,
    }));
};

export function HackerNewsSearch() {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [tag, setTag] = React.useState('story');
  const [page, setPage] = React.useState(0);
  const [resultsPerPage, setResultsPerPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(50);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const loadResults = async () => {
      setLoading(true);
      const { pages, results, resultsPerPage } = await fetchData({ query, page, tag });
      setResults(results);
      setResultsPerPage(resultsPerPage);
      setTotalPages(pages);
    };
    loadResults();
  }, [query, page, tag]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(0);
  };

  const handleTag = (e) => {
    setTag(e.target.value);
    setPage(0);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  return (
    <main>
      <h1>Hacker News Search</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="query">Search</label>
          <input
            type="text"
            id="query"
            name="query"
            value={query}
            onChange={handleSearch}
            placeholder="Search Hacker News..."
          />
        </div>
        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" onChange={handleTag} value={tag}>
            <option value="story">Story</option>
            <option value="ask_hn">Ask HN</option>
            <option value="show_hn">Show HN</option>
            <option value="poll">Poll</option>
          </select>
        </div>
      </form>
      <section>
        {!loading && <div>Loading</div>}
        {results && (
          <ul>
            {results?.map((item) => (
              <li>
                <a href={item.url} key={item.story_id}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
      <button onClick={handleNextPage}>+</button>
      <button onClick={handlePrevPage}>-</button>
      <div> All pages: {totalPages}</div>
    </main>
  );
}

export default function App() {
  return HackerNewsSearch();
}
