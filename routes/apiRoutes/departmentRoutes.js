const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

// Get list of all employees
router.get('/tracker/department', (req, res) => {
    const sql = `SELECT * FROM tracker.department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});
router.post('/tracker/department', ({ body }, res) => {
    console.log('444', body)
    const sql = `INSERT INTO department (department_name) VALUES (?)`;
    const params = [body.title ];
    
    db.query(sql, params, (err, result) => {
        console.log('created new department', body);
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.log('this was a success', body)
        res.json({
            message: 'success',
            data: body
        });
    });
});


module.exports = router;
