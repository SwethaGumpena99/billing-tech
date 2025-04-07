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
      setSelectedInvoice(invoiceId);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    setInvoiceDetails(null);
  };

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal-overlay") {
      closeModal();
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

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

      {selectedInvoice && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h3>Invoice Details</h3>
            {invoiceDetails && (
              <div>
                <div className="invoice-summary">
                  <table>
                    <thead>
                      <tr>
                        <th>Invoice ID</th>
                        <th>User ID</th>
                        <th>Total Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{invoiceDetails[0].invoice_id}</td>
                        <td>{invoiceDetails[0].user_id}</td>
                        <td>{invoiceDetails[0].total_amount}</td>
                        <td>{invoiceDetails[0].status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="line-items-section">
                  <h4>Line Items</h4>
                  <table className="line-items-table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDetails.map((item) => (
                        <tr key={item.line_item_id}>
                          <td>{item.description}</td>
                          <td>{item.quantity}</td>
                          <td>{item.unit_price}</td>
                          <td>{item.total_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceTable;
