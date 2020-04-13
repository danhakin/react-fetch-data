import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  hits: []
};

function fetchData() {
  return axios("https://hn.algolia.com/api/v1/search?query=redux");
}

function App() {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    fetchData().then(result => setData(result.data));
  }, []);

  return (
    <ul>
      <ul>
        {data.hits.map(item => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </ul>
  );
}

export default App;
