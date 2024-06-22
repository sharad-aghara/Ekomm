const express = require('express');
const mongoose = require('mongoose');
const { PORT, URI } = require('./config/index.js');
const server = express();

const productRoutes = require('./routes/productRoute.js');
const userAuth = require('./routes/userAuthRoute.js')

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

// start up server
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);