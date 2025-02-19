const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

//dotenv config
dotenv.config();

//mogodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require("./routes/authRoutes"));
//app.use('/api/v1/auth', require("./routes/InventoryRoutes"));
// Change this line to import InventoryRoutes
app.use('/api/v1/inventory', require("./routes/InventoryRoutes"));
app.use('/api/v1/analytics', require("./routes/analyticsRoutes"));

app.use('/api/v1/admin', require("./routes/adminRoutes"));

//port
const PORT = process.env.PORT || 3001;

//listen
app.listen(PORT, () => {
     console.log(`Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`.bgBlue.white);
});


