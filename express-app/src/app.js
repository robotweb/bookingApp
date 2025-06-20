const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
// Parse URL-encoded bodies (for application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Middleware
app.use(express.json());
const protectRoute = require('./authMiddleware'); // Import the middleware
const routes = require('./routes');
const booking = require('./routes/booking');
const customer = require('./routes/customer');
const team = require('./routes/team');
const service = require('./routes/service');
const vehicle = require('./routes/vehicle');

// Routes
app.use('/', routes);
app.use('/booking', booking);
app.use('/customer', customer);
app.use('/team', team);
app.use('/service', service);
app.use('/vehicle', vehicle);



// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  return res.status(err.statusCode ?? 500).json({ error: err.statusText ?? 'Something went wrong' });
});

module.exports = app;