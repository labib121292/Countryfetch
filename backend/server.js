const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Set your MySQL root password here
  database: 'country_explorer',
});

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Get all visited countries
app.get('/visited', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM visited_countries');
    res.json(rows);
  } catch (error) {
    handleError(res, error);
  }
});

// Add a visited country
app.post('/visited', async (req, res) => {
  const { cca3, name, flag_url } = req.body;
  if (!cca3 || !name || !flag_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await pool.query(
      'INSERT IGNORE INTO visited_countries (cca3, name, flag_url) VALUES (?, ?, ?)',
      [cca3, name, flag_url]
    );
    res.status(201).json({ message: 'Visited country added' });
  } catch (error) {
    handleError(res, error);
  }
});

// Get all wish countries
app.get('/wish', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM wish_countries');
    res.json(rows);
  } catch (error) {
    handleError(res, error);
  }
});

// Add a wish country
app.post('/wish', async (req, res) => {
  const { cca3, name, flag_url } = req.body;
  if (!cca3 || !name || !flag_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await pool.query(
      'INSERT IGNORE INTO wish_countries (cca3, name, flag_url) VALUES (?, ?, ?)',
      [cca3, name, flag_url]
    );
    res.status(201).json({ message: 'Wish country added' });
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
