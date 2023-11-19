const blogsRouter = require('express').Router()
const Blog = require('../Models/blogModel');

blogsRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch(error) {
        console.error(error);
    };
});


blogsRouter.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        return res.json(blog);
    } catch(error) {
        return res.status(400).json({ error });
    };
});


blogsRouter.delete('/:id', async(req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if(!blog) {
            return res.status(404).json({ error: "blog not found" })
        }
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send();
    } catch(error) {
        res.status(500).json({ error })
    }
})

module.exports = blogsRouter