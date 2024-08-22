module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    return Comment;
  };
  