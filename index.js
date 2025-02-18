require('dotenv').config();
const express = require('express');
const path = require('path')

const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));

app.use('/api', userRoutes, productsRoutes, cartsRoutes);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
})

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});