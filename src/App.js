import React, { useState } from "react";

const initialState = {
  hits: [{ objectID: 1, url: "/link-1", title: "Link 1" }]
};

function App() {
  const [data] = useState(initialState);

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
