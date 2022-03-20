import React, { useState, useEffect, useCallback } from "react";
// import useFetch from "./useFetch";
import "./App.css";

const sampleUrl = [
  {
    path: "https://jsonplaceholder.typicode.com/users",
    name: "All Users",
  },
  {
    path: "https://jsonplaceholder.typicode.com/users/1",
    name: "First User",
  },
  {
    path: "https://jsonplaceholder.typicode.com/users/2",
    name: "Second User",
  },
  {
    path: "https://jsonplaceholder.typicode.com/users/10",
    name: "Last User",
  },
];

//custom hook

export const useFetch = (initialUrl, callback) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(initialUrl);

  const executeFetch = useCallback(async () => {
    console.log("fetching data....");
    try {
      const request = await fetch(url);
      const response = await request.json();

      if (!response) {
        throw "Data was not fetched";
      }

      Array.isArray(response) ? setData(response) : setData([response]);

      callback(response);

      console.log("loading done....");
      setError({});
    } catch (error) {
      setError(error);

      console.log("loading done....");
    }
  }, [url]);

  useEffect(() => {
    executeFetch();
  }, [url]);

  return { data, error, setUrl };
};

//custom hook end

const App = () => {
  const { data, error, setUrl } = useFetch(
    "https://jsonplaceholder.typicode.com/users",
    (response) => console.log({ response })
  );

  console.log({ error });

  return (
    <div className="App">
      <h1>ReactJs Test</h1>
      <h4>Fetch Data Using Custom fetch Hook (useFetch)</h4>
      <div>
        <select onChange={(ev) => setUrl(ev.target.value)}>
          {sampleUrl.map((url) => (
            <option key={url.name} value={url.path}>
              {url.name}
            </option>
          ))}
        </select>
      </div>
      {error ? <p>{error.message}</p> : null}
      {data ? data.map((item) => <h5 key={item.id}>{item?.name}</h5>) : null}
    </div>
  );
};

export default App;
