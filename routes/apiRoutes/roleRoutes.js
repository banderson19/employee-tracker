const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');

//Get list of all roles
// router.get('/tracker/role', (req, res) => {
//     const sql = `SELECT * FROM tracker.role`;
//     db.query(sql, (err, rows) => {
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

// Get list of employees by role  # 2
router.get('/tracker/employee/role', (req, res) => {
    const sql = `SELECT * FROM employee LEFT JOIN tracker.role ON employee.role_id = role.id;`;
    db.query(sql, (err, rows) => {
        // console.log('sorted by role_id', req.params)
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

router.post('/tracker/role', ({ body }, res) => {
    console.log(body)
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const params = [body.title, body.salary, body.department_id];
    
    db.query(sql, params, (err, result) => {
        console.log('created new role', params);
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