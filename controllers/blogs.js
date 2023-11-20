const blogsRouter = require('express').Router()
const { Blog, User } = require('../Models/index');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../util/config');
const { Op } = require('sequelize');

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      try {
        console.log(authorization.substring(7))
        req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      } catch (error){
        console.log(error)
        return res.status(401).json({ error: 'token invalid' })
      }
    } else {
      return res.status(401).json({ error: 'token missing' })
    }
    next()
}

blogsRouter.get('/', async (req, res) => {
    const where = {};

    if(req.query.title) {
        where.title = {
            [Op.substring]: req.query.title
        }
    }

    if(req.query.author) {
        where.author = {
            [Op.substring]: req.query.author
        }
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        },
        order: [
            ['likes', 'DESC']
        ],
        where
    });
    res.json(blogs);
});


blogsRouter.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id);
        if(!user) {
            return res.status(404).json({ error: "user was not found" });
        };
        console.log(req.body)
        console.log(user.id)
        const blog = await Blog.create({ ...req.body, userId: user.id });
        res.json(blog);
    } catch(error) {
        next(error);
    };
});


blogsRouter.delete('/:id', async(req, res, next) => {
    const blog = await Blog.findByPk(req.params.id);
    if(!blog) {
        return res.status(404).json({ error: "blog not found!" });
    };
    await Blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(204).send();
});

blogsRouter.put('/:id', async(req, res, next) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if(!blog) {
            return res.status(404).json({ error: "Blog not found!" });
        };
        blog.likes = req.body.likes;
        await blog.save();
        res.status(200).json({ message: 'Blog updated!' })
    } catch(error) {
        next(error)
    };
});

module.exports = blogsRouter