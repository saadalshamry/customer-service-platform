module.exports = function (sequelize, DataTypes) {
  var Ticket = sequelize.define("Ticket", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    technician: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    resolution: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isFinished: {
      type: DataTypes.BOOLEAN,
      allowNUll: false,
      defaultValue: false
    },
  });
  return Ticket;
};
