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

const requestRefund = async (req, res) => {
  console.log("Requesting full refund...");
  const { invoice_id, user_id, request_description } = req.body;

  if (!invoice_id || !user_id || !request_description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO refund_requests (invoice_id, user_id, request_description, status)
       VALUES (?, ?, ?, 'Pending')`,
      [invoice_id, user_id, request_description]
    );

    res.status(201).json({
      message: "Refund request submitted",
      refund_request_id: result.insertId
    });
  } catch (error) {
    console.error("Error creating refund request:", error);
    res.status(500).json({ error: "Failed to submit refund request" });
  }
};

const submitLineItemChangeRequest = async (req, res) => {
  console.log("Requesting line item change rquest...");
  const { line_item_id, user_id, request_description, status } = req.body;

  if (!line_item_id || !user_id || !request_description || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO change_requests (line_item_id, user_id, request_description, status)
       VALUES (?, ?, ?, ?)`,
      [line_item_id, user_id, request_description, status]
    );

    res.status(201).json({
      message: "Change Request submitted",
      refund_request_id: result.insertId
    });
  } catch (error) {
    console.error("Error creating change request:", error);
    res.status(500).json({ error: "Failed to submit change request" });
  }
};

// Endpoint to get all invoices
router.get("/", fetchInvoices);

// Add the new endpoint
router.get("/:invoice_id", fetchInvoiceDetails);

router.post("/request-refund", requestRefund);

router.post("/request-lineitemchange", submitLineItemChangeRequest);

module.exports = {
  router,
};
