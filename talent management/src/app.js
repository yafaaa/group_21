
const express = require('express');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const errorMiddleware = require('./middlewares/error.middleware'); // error handler
app.use(errorMiddleware);

module.exports = app;
