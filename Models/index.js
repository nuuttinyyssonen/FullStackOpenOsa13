const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./readinglist');

User.hasMany(Blog)
Blog.belongsTo(User)

// Blog.sync({ alter: true });
// User.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: 'read' })
Blog.belongsToMany(User, { through: ReadingList, as: 'list' })

module.exports = {
    Blog, User, ReadingList
};