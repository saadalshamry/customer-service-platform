module.exports = function(sequelize, DataTypes) {
  var Ticket = sequelize.define("Ticket", {
    ticketOwner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketTech: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketNum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ticketCompany: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketResolution: {
      type: DataTypes.STRING,
      allowNUll: false
    },
    ticketStatus: {
      type: DataTypes.STRING,
      defaultValue: "Open"
    }
  });
  return Ticket;
};
