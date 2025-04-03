import React, { useEffect, useState } from "react";
import { fetchInvoices } from "./api";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const data = await fetchInvoices();
        console.log("Fetched invoices:", data);
        setInvoices(data);
      } catch (err) {
        console.error("Error fetching invoices:", err);
        setError("Failed to load invoices.");
      }
    };

    getInvoices();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (invoices.length === 0) {
    return <p>No invoices available.</p>;
  } else {
    return (
      <div>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>User ID</th>
              <th>Total Amount</th>
              <th>Invoice Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.invoice_id}>
                <td>{invoice.invoice_id}</td>
                <td>{invoice.user_id}</td>
                <td>{invoice.total_amount}</td>
                <td>{invoice.invoice_date}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default InvoiceTable;
