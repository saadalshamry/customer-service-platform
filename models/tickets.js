module.exports = function(sequelize, DataTypes) {
  var Tickets = sequelize.define("Tickets", {
    ticketOwner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketNum: {
        type:DataTypes.INTEGER,
        allowNull: false  
    },
    ticketCompany: {
        type: DataTyes.STRING,
        allowNull: false
    },
    ticketPhone: {
        type: DataTypes.INTGER,
        allowNull: false
    },
    ticketEmail: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ticketDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ticketResolution: {
        type: DataTypes.INTEGER,
        allowNUll: false
    },
    ticketStatus: {
      type: DataTypes.STRING,
      defaultValue: "Open"
    },
    ticketCreated: {
        type: DataTypes.DATE
    },
    ticketUpdated: {
        type: DataTypes.DATE
    }

  });
  return Tickets;
};
