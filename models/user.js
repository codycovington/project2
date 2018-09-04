module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: DataTypes.STRING
    });

  
    User.associate = function (models) {

        // old code to go back to

        //association between the User and the Project
        // User.hasMany(models.Project, {
        //     onDelete: "cascade"
        // });
        
        //association between the project and tasks
        // User.hasMany(models.Task, {
        //     onDelete: "cascade"
        // });

        // new code to try
        User.belongsTo(models.Project, {
            foreignKey: {
                allowNull: true
            }
        });

        User.hasMany(models.Task, {
            onDelete: "cascade"
        });
    };
    return User;
};

