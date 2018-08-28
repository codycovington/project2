module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    task_name: {
      type: DataTypes.STRING,
      // this field cannot be NULL
      allowNull: false,
      //this validation makes it be so that the task cannot be blank
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
    }
  });

  Task.associate = function(models){
    // The Task needs to belong to a User
    Task.belongsTo(models.User, {
      foreignKey: { 
        allowNull: false
      }
    });
  };
  return Task;
};
