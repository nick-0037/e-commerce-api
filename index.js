require('dotenv').config();
const express = require('express');

const errorHandler = require('./middlewares/errorHandler');

const userRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', cartsRoutes);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});