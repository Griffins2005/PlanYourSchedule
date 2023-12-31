require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scheduleRoutes = require('./routes/Event');
const userRoutes = require('./routes/User');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/schedule', scheduleRoutes);
app.use('/api/users', userRoutes);

mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB database connection established successfully');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log(err));
