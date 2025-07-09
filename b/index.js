import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import usersRoute from './routes/usersRoute.js'
import productsRoute from './routes/productsRoute.js';
import downloadRoute from './routes/downloadRoute.js'
import salesRoute from './routes/salesRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';
import reviewsRoute from './routes/reviewsRoute.js';
import dashboardRoute from './routes/dashboardRoute.js';

const app = express();


import dotenv from 'dotenv';
dotenv.config();



// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome');
});


app.use('/users', usersRoute);
app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/purchases', purchaseRoute);
app.use('/reviews', reviewsRoute);
app.use('/download', downloadRoute);
app.use('/dashboard',dashboardRoute)

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
