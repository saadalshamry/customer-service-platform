module.exports = function(sequelize, DataTypes) {
  var Staff = sequelize.define("Staff", {
    employeeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employeeNumber: {
        type:DataTypes.INTEGER,
        allowNull: false 
    },
    employeeRole: {
        type: DataTyes.STRING,
        allowNull: false
    },
    employeePhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeePassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employeeStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
  });
  return Staff;
};
