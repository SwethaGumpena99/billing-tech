import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import InvoiceTable from "./invoice";

function App() {
  const [apiResponse, setApiResponse] = useState("");


  return (
    <>
      <div><h2>Billing Tech</h2></div>
      <InvoiceTable />
    </>
  );
}

export default App;
