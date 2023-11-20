const readingListRouter = require('express').Router();
const { ReadingList } = require('../Models/index');

readingListRouter.post('/', async(req, res, next) => {
    try {
        const readinglist = await ReadingList.create(req.body);
        res.json(readinglist);
    } catch(error) {
        next(error)
    }
});

readingListRouter.get('/:id', async(req, res) => {
    const lists = await ReadingList.findByPk(req.params.id);
    res.json(lists);
})

readingListRouter.put('/:id', async(req, res, next) => {
    try {
        const readingList = await ReadingList.findByPk(req.params.id);
        readingList.isRead = req.body.isRead;
        await readingList.save();
        res.json(readingList);
    } catch(error) {
        next(error)
    }
})

module.exports = readingListRouter;