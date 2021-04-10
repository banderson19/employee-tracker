const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

//Get list of all roles
router.get('/tracker/role', (req, res) => {
    const sql = `SELECT * FROM tracker.role`;
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success', 
            data: rows
        })
    })
})

module.exports = router;