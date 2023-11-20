const { User, Blog, ReadingList } = require('../Models/index');
const userRouter = require('express').Router();
const { Op } = require('sequelize');

userRouter.get('/', async(req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog
        }
    });
    res.json(users);
});

userRouter.post('/', async(req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch(error) {
        next(error);
    };
});

userRouter.get('/:id', async(req, res) => {
    const where = {}
    if(req.query.read === 'true') {
        where.is_read = 'true'
    }

    if(req.query.read === 'false') {
        where.is_read = 'false'
    }

    const user = await User.findByPk(req.params.id, {
        include: {
            model: Blog,
            as: 'read',
            attributes: {
              exclude: ['userId'],
              include: ['year'],
            },
            through: {
              as: 'list',
              where
            },
        },
        
    })
    res.json(user)
})

userRouter.get('/:username', async(req, res, next) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        },
    });
    if(!user) {
        return res.status(404).json({ error: "user was not found!" });
    };
    res.json(user);
});


userRouter.put('/:username', async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params.username
            }
        });
        user.username = req.body.username;
        await user.save();
        res.status(200).json(user);
    } catch(error) {
        next(error);
    }
})

module.exports = userRouter;