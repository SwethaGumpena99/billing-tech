import axios from "axios";

export const fetchInvoices = async () => {
  try {
    const response = await axios.get("http://localhost:8080/invoices");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching invoices");
  }
};
