const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const { User, Session } = require('../Models/index');
const { SECRET } = require('../util/config');

loginRouter.post('/', async(req, res) => {
    const body = req.body;
    const user = await User.findOne({
        where: {
            username: body.username
        }
    });

    if(user.disabled) {
        return res.status(400).json({ error: "account has been disabled" })
    }

    const passwordCorrect = body.password === 'secret';

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    };

    const userForToken = {
        username: user.username,
        id: user.id
    };

    const token = jwt.sign(userForToken, SECRET);
    if(user && token) {
        const session = await Session.create({ userId: user.id, token: token });
        console.log(session)
    }
    res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;