
//.......server.js...
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products');
const logger = require('./middleware/logger');
const { errorHandler, NotFoundError } = require('./errors/CustomErrors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Routes
app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/products', productsRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

