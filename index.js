const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config();
const { connectToDatbase } = require('./util/db');
const { PORT } = require('./util/config');

const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');
const readingListRouter = require('./controllers/readinglists');

const { errorHandler, unknownEndpoint } = require('./util/middleware');

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglist', readingListRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

const start = async() => {
  await connectToDatbase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
};

start();