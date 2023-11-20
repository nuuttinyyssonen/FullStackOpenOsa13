const authorsRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const { Blog } = require('../Models/index');


authorsRouter.get('/', async(req, res) => {
    const blogs = await Blog.findAll({
        attributes: [
            'author',
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'blogs'],
            [Sequelize.fn('SUM', Sequelize.col('likes')), 'likes']
        ],
        group: ['author']
    });
    res.json(blogs);
});

module.exports = authorsRouter;