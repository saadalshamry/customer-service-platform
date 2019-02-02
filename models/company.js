module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyAddress1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyAddress2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    companyCity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyProv: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyCountry: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Canada"
    },
    companyPostalCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyStatus: {
      type: DataTypes.STRING,
      defaultValue: "Active"
    }
  });
  return Company;
};
