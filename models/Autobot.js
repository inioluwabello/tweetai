module.exports = (sequelize, DataTypes) => {
    const Autobot = sequelize.define('Autobot', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
    });
  
    return Autobot;
  };
  