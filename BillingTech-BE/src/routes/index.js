"use strict";
const express = require("express");
const { router: healthRouter } = require("./health.route");
const { router: invoiceRouter } = require("./invoices.route");

const router = express.Router();
router.use("/ping", healthRouter);
router.use("/invoices", invoiceRouter);

module.exports = {
  router,
};
