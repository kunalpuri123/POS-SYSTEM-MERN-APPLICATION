const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { bgCyan } = require('colors');
const connectDb = require('./config/config');
dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Importing routes
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const billsRoutes = require('./routes/billsRoutes');

// Mounting routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bills', billsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`.bgCyan.white);
});
