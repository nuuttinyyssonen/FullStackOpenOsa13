const logoutRouter = require('express').Router();
const { Session, User } = require('../Models/index');
const { tokenExtractor } = require('../util/middleware');


logoutRouter.post('/', tokenExtractor, async(req, res) => {
    const user = await User.findByPk(req.decodedToken.id);
    if(!user) {
        return res.status(404).json({ error: "user was not found" });
    };
    const session = await Session.destroy({
        where: {
            userId: user.id
        }
    })
    res.status(200).json(session)
});

module.exports = logoutRouter;