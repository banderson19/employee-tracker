const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

// Get list of all employees
router.get('/tracker/employee', (req, res) => {
    const sql = `SELECT * FROM tracker.employee`;
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

// Create an employee
router.post('/tracker/employee', ({ body }, res) => {
    console.log('hello');
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

// Update an employees role
router.put('/tracker/employee/role/:id', (req, res) => {
    console.log("Employee role updated", req.body);

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Update employees manager
router.put('/tracker/employee/manager/:id', (req, res) => {
    console.log("Employees manager updated", req.body);

    const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
    const params = [req.body.manager_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Delete employee
router.delete('/tracker/employee/:id', (req, res) => {
    console.log("Employee deleted", req.params);
    
    const sql = `DELETE FROM employee WHERE id = ?`;
    
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


module.exports = router;
