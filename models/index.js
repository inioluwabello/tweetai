const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import models
const AutobotModel = require('./Autobot');
const PostModel = require('./Post');
const CommentModel = require('./Comment');

// Initialize models
const Autobot = AutobotModel(sequelize, Sequelize.DataTypes);
const Post = PostModel(sequelize, Sequelize.DataTypes);
const Comment = CommentModel(sequelize, Sequelize.DataTypes);

// Set up associations (relationships)
Autobot.hasMany(Post, { foreignKey: 'autobotId', as: 'posts' });
Post.belongsTo(Autobot, { foreignKey: 'autobotId', as: 'autobot' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

// Export models and sequelize instance
module.exports = {
  Autobot,
  Post,
  Comment,
  sequelize
};
