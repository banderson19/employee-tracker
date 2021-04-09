const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
// const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: '!Tungsten8',
        database: 'election'
    },
    console.log('Connected to the election database.')
    );

app.get('/api/tracker/employee', (req, res) => {
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
