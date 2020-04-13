import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  hits: []
};

function App() {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );
      setData(result.data);
    };
    fetchData();
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
