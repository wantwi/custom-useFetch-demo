import { useState, useEffect, useCallback } from "react";

const useFetch = (initialUrl, callback) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
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
  });

  useEffect(() => {
    executeFetch();
  }, [url]);

  return { data, error, setUrl };
};

export default useFetch;
