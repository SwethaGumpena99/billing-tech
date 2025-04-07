import axios from "axios";

export const fetchInvoices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/invoices");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invoices");
  }
};

export const fetchInvoiceDetails = async (invoiceId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/invoices/${invoiceId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invoice details");
  }
};
