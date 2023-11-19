const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const { QueryTypes, } = require('sequelize');
const Blog = require('./Models/blogModel');
const sequelize = require('./sequalize');
const blogsRouter = require('./controllers/blogs');
app.use(cors())
app.use(express.json())

Blog.sync()

const main = async () => {
    try {
      await sequelize.authenticate()
      const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
      console.log(blogs)
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  
  main()

app.get('/', async(req, res) => {
    const blogs = await Blog.findAll();
    res.json(blogs)
})

app.use('/api/blogs', blogsRouter);
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})