const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

// Get list of all employees
router.get('/tracker/employee', (req, res) => {
    console.log('hello employees')
    // const sql = `SELECT * FROM employee`;
    const sql = `SELECT * FROM employee LEFT JOIN tracker.role ON employee.role_id = role.id;`
    
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('get employees success')
        res.json({
            message: 'success',
            data: result
        });
    });
});

// Get employee by id
// router.get('/tracker/employee/:id', (req, res) => {
//     const sql = `SELECT * FROM employee WHERE id = ?`;
//     db.query(sql, req.params.id, (err, rows) => {
//         console.log('employee by id', req.params)
//         if(err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         })
//     })
// })

// ## Check commented out of duplicated methods on single

// Get list of employees by role 
// router.get('/tracker/employee/role/:id', (req, res) => {
//     const sql = `SELECT * FROM employee LEFT JOIN tracker.employee = ?`;
//     db.query(sql, req.params.id, (err, rows) => {
//         console.log('sorted by role_id', req.params)
//         if(err) {
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         })
//     })
// })

// Get list of employees by manager
// router.get('/tracker/employee/manager/:id', (req, res) => {
//     const sql = `SELECT * FROM employee WHERE manager_id = ?`;
//     db.query(sql, req.params.id, (err, rows) => {
//         console.log('sorted by manager_id', req.params)
//         if(err) {
//             res.status(500).json({ error: err.message });
//             return;
//         } 
//         res.json({
//             message: 'success id values',
//             data: rows
//         })
//     })
// })

// Create an employee
router.post('/tracker/employee', ({ body }, res) => {
    console.log('server side', body)
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
    console.log(params)
    db.query(sql, params, (err, result) => {
        console.log('created new employee', body);
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

// Update an employees role
// change role_id. look at mysql to see the role_id is not being updated correctly
router.put('/tracker/employee/role/:id', (req, res) => {
    console.log("Employee role updated", req.body, req.params.id);
    
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
            console.log('success')
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

// Update employees manager
// router.put('/tracker/employee/manager/:id', (req, res) => {
//     console.log("Employees manager updated", req.body);

//     const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
//     const params = [req.body.manager_id, req.params.id];

//     db.query(sql, params, (err, result) => {
//         if (err) {
//             res.status(400).json({ error: err.message });
//         } else if (!result.affectedRows) {
//             res.json({
//                 message: 'Employee not found'
//             });
//         } else {
//             res.json({
//                 message: 'success',
//                 data: req.body,
//                 changes: result.affectedRows
//             });
//         }
//     });
// });

// Delete employee
// no semicolon in localhost url
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
