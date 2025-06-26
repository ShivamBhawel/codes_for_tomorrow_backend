const express = require('express');
require('dotenv').config();

const userRouter = require('./Routes/userRoutes');
const profilRoutes = require('./Routes/profileRoutes');

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/profile', profilRoutes);

app.listen(process.env.PORT , () =>
  console.log('API running on port', process.env.PORT || 5000)
);
