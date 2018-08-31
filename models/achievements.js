module.exports = function (sequelize, DataTypes) {
    var Achievement = sequelize.define("Achievements", {
        task_completed: DataTypes.STRING
    });

    //association between the User and the Task
    // Achievement.associate = function (models) {
    //     Achievement.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };
    return Achievement;
};

//Not sure how this should be set up just yet this is just a started template for the awards. 