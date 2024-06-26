const express = require('express');
const mongoose = require('mongoose');
const { PORT, URI } = require('./config/index.js');
const server = express();

const productRoutes = require('./routes/productRoute.js');
const userAuth = require('./routes/userAuthRoute.js');
const cartRoutes = require('./routes/cartRoute.js');
const checkoutRoutes = require('./routes/checkoutRoute.js');
const cors = require('cors');

// Enable CORS
server
.use(cors({
    origin: true,

    credentials: true 
}));


// {
//     origin: 'http://localhost:4200', // Allow requests from Angular development server
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
//     allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
//   }
// Middleware
server.use(express.json());

// connect to database
mongoose
    .connect(URI)
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

// connect main route to server
// server.use(App);
server.use('/api', userAuth);
server.use('/api/products', productRoutes);
server.use('/api/cart', cartRoutes);
server.use('/api', checkoutRoutes);

// start up server
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);