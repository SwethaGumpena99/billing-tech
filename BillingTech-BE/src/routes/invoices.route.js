"use strict";
const express = require("express");
const db = require("../db");

const router = express.Router();

const fetchInvoices = async (req, res) => {
  console.log("Fetching invoices...");
  try {
    const [rows] = await db.query(
      "SELECT invoice_id, user_id, invoice_date, total_amount, status, created_at FROM invoices"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

const fetchInvoiceDetails = async (req, res) => {
  const { invoice_id } = req.params;
  console.log(`Fetching details for invoice ID: ${invoice_id}`);
  try {
    const [invoiceDetails] = await db.query(
      `SELECT i.invoice_id, i.user_id, i.invoice_date, i.total_amount, i.status, 
              li.line_item_id, li.description, li.quantity, li.unit_price, li.total_price
       FROM invoices i
       LEFT JOIN line_items li ON i.invoice_id = li.invoice_id
       WHERE i.invoice_id = ?`,
      [invoice_id]
    );

    if (invoiceDetails.length === 0) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json(invoiceDetails);
  } catch (error) {
    console.error("Error fetching invoice details:", error);
    res.status(500).json({ error: "Failed to fetch invoice details" });
  }
};

// Endpoint to get all invoices
router.get("/", fetchInvoices);

// Add the new endpoint
router.get("/:invoice_id", fetchInvoiceDetails);

module.exports = {
  router,
};
