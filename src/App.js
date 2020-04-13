import React, { Fragment, useState } from "react";
import { useDataApi } from "./hooks/fetchData";

function App() {
  const [query, setQuery] = useState("redux");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://hn.algolia.com/api/v1/search?query=redux",
    { hits: [] }
  );

  return (
    <Fragment>
      <form
        onSubmit={event => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Ops, something went wrong... :'( </div>}

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
