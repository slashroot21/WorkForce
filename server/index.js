import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import runnerRoutes from './routes/runnerRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

// error handler for the whole server
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// to access .env file
dotenv.config({ path: './config.env' });

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// app.use('/api')
app.use('/api/runners', runnerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reviews', reviewRoutes);


const DB = process.env.DB_CONNECTION.replace(
    '<PASSWORD>',
    process.env.DB_PASSWORD
);
const PORT = process.env.PORT || 5000;

mongoose.connect(DB)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
