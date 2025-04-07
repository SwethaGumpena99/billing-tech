import React, { useEffect, useState } from "react";
import { fetchInvoices, fetchInvoiceDetails } from "./api";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);

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

  const handleInvoiceClick = async (invoiceId) => {
    try {
      const details = await fetchInvoiceDetails(invoiceId);
      setInvoiceDetails(details);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

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
              <tr
                key={invoice.invoice_id}
                onClick={() => handleInvoiceClick(invoice.invoice_id)}
              >
                <td>{invoice.invoice_id}</td>
                <td>{invoice.user_id}</td>
                <td>{invoice.total_amount}</td>
                <td>{invoice.invoice_date}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {invoiceDetails && (
          <div className="invoice-details">
            <h3>Invoice Details</h3>
            <p>Invoice ID: {invoiceDetails[0].invoice_id}</p>
            <p>User ID: {invoiceDetails[0].user_id}</p>
            <p>Total Amount: {invoiceDetails[0].total_amount}</p>
            <p>Status: {invoiceDetails[0].status}</p>
            <h4>Line Items</h4>
            <ul>
              {invoiceDetails.map((item) => (
                <li key={item.line_item_id}>
                  {item.description} - {item.quantity} x {item.unit_price} ={" "}
                  {item.total_price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default InvoiceTable;
