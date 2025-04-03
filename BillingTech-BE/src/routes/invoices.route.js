'use strict';
const express = require("express");
const db = require("../db");

const router = express.Router();

const fetchInvoices = async (req, res) => {
  console.log("Fetching invoices...");
  try {
    const [rows] = await db.query("SELECT * FROM invoices");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

// Endpoint to get all invoices
router.get("/", fetchInvoices);

module.exports = {
  router,
};
