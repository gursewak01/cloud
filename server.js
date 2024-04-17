const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8000;

// Create connection to MySQL database
// connection code
const connection = mysql.createConnection({
  host: 'clouddatabase1.cht3xn8hide0.us-east-1.rds.amazonaws.com',
  user: 'admin', // Replace with your MySQL username
  password: 'gursewak123', // Replace with your MySQL password
  database: 'cloud_database'
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// sign up code
// Endpoint to handle signup requests
app.post('/signup', (req, res) => {
  console.log("post")
  const { First_Name, Last_Name, Username, Email, Password} = req.body;
  console.log(req.body)
  const sql = 'INSERT INTO signup (First_Name,Last_Name,Username,Email,Password) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [First_Name, Last_Name, Username, Email, Password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('User inserted successfully');
      res.status(200).json({ message: 'Signup successful' });
    }
  });
});

// login code
app.post('/login', (req, res) => {
  const { Username, Password } = req.body;
  const sql = 'SELECT * FROM signup WHERE Username = ? AND Password = ?';
  connection.query(sql, [Username, Password], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (result.length > 0) {
        // User found, login successful
        console.log('Login successful');
        res.status(200).json({ message: 'Login successful',data:result });
      } else {
        // User not found or password incorrect
        console.log('Invalid username or password');
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
