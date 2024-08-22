module.exports = (sequelize, DataTypes) => {
    const Autobot = sequelize.define('Autobot', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });
  
    return Autobot;
  };
  