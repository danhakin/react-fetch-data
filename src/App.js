import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [searchUrl, setSearchUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(searchUrl);

      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [searchUrl]);

  return (
    <Fragment>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setSearchUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        </ul>
      )}
    </Fragment>
  );
}

export default App;
