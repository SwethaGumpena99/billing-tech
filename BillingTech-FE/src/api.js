import axios from "axios";

export const fetchInvoices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/invoices");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error fetching invoices");
  }
};

export const fetchInvoiceDetails = async (invoiceId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/invoices/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error fetching invoice details"
    );
  }
};

export const requestRefund = async (invoiceId, userId, description) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/invoices/request-refund",
      {
        invoice_id: invoiceId,
        user_id: userId,
        request_description: description,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to submit refund request"
    );
  }
};
