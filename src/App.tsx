import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchCountries } from "./data/countries";
import MatchingApp from "./components/MatchingApp";

function App() {
  const [fetchedData, setFetchedData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCountries();
        if (data) {
          setFetchedData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!fetchedData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MatchingApp data={fetchedData} />
    </>
  );
}

export default App;
