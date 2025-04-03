const express = require('express')
const db = require('../db');

const router = express.Router()

const healthHandler = async (req, res) => {
    const [rows] = await db.query('SELECT username FROM users');
    const usernames = rows.map(row => row.username).join(', ');
    res.status(200).json(usernames);
    // res.status(200).send('pong')
}

router.get('', healthHandler)

module.exports = {
    router
}