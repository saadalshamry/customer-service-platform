module.exports = function (sequelize, DataTypes) {
    var Staff = sequelize.define("Staff", {
        employeeName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeeNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        employeeRole: {
            type: DataTypes.STRING,
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
            allowNull: false,
            defaultValue: "on"
        },

    });
    return Staff;
};
