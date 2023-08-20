const sequelize = require('../config/connection');
const {User, Comment, Blog} = require('../models');
const userData = require('./userData.json');
const commnetData = require('./commentData.json');
const blogData = require('./blogData.json');

const seedDB = async () => {
  await sequelize.sync({ force: true});
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

for (const blog of blogData) {
  await Blog.create({
    ...blog,
    user_id: users[Math.floor(Math.random() * users.length)].id,
  });
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blog.id
    });
  }
}};


seedDB();
