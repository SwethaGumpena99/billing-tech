import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import InvoiceTable from "./invoice";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("http://localhost:8080/ping"); // Make the GET request
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data from the API.");
    }
  };

  return (
    <>
      <div>
        <p>{`Hello 👋  ${apiResponse}`}</p>
        <button onClick={handleButtonClick}>Ping API</button>
      </div>
      <InvoiceTable />
    </>
  );
}

export default App;
