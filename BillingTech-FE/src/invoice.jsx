import React, { useEffect, useState } from "react";
import { fetchInvoices, fetchInvoiceDetails, requestRefund } from "./api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  const [refundDescription, setRefundDescription] = useState("");
  const [isRequestFullRefund, setIsRequestFullRefund] = useState(false);

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

  const submitRefundRequest = async () => {
    if (!refundDescription.trim()) {
      toast.error("Please enter a refund description.");
      return;
    }

    try {
      await requestRefund(
        invoiceDetails[0].invoice_id,
        invoiceDetails[0].user_id,
        refundDescription
      );
      toast.success("Refund request submitted successfully!");
      setRefundDescription("");
      setIsRequestFullRefund(false);
    } catch (err) {
      console.error("Refund request failed:", err);
      toast.error(err.message || "Failed to submit refund request.");
    }
  };

  const closeModal = () => {
    setSelectedInvoice(null);
    setInvoiceDetails(null);
    setIsRequestFullRefund(false);
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
              style={{ cursor: "pointer" }}
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
                  {/* Request Refund Button */}
                  {!isRequestFullRefund && (
                    <button
                      onClick={() => setIsRequestFullRefund(true)} // show textarea
                      className="request-full-refund-button"
                    >
                      Full Refund
                    </button>
                  )}
                </div>

                {/* Refund Form */}
                {isRequestFullRefund && (
                  <div
                    className="refund-request-form"
                    style={{ marginTop: "1rem" }}
                  >
                    <textarea
                      placeholder="Enter reason for refund..."
                      value={refundDescription}
                      onChange={(e) => setRefundDescription(e.target.value)}
                      rows={3}
                      style={{
                        width: "96%",
                        marginBottom: "0.5rem",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={submitRefundRequest}
                      className="submit-refund-request-button"
                    >
                      Submit
                    </button>
                  </div>
                )}
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default InvoiceTable;
