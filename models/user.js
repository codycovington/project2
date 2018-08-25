module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING
    });

    //association between the User and the Task
    User.associate = function (models) {
        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };
    return User;
};

