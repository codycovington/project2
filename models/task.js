module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    text: {
      type: DataTypes.STRING,
      // this field cannot be NULL
      allowNull: false,
      //this validation makes it be so that the task cannot be blank
      validate: {
        len: [1]
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      //Starting with false means that an action has to be taken to complete this task
      defaultValue:false
    }
  });

  Task.associate = function(models){
    // The Task needs to belong to a User
    Task.belongsTo(models.User, {
      foreignKey: { 
        allowNull: false
      }
    });

    // The task needs to belong to a project
    Task.belongsTo(models.Project, {
      foreignKey: { 
        allowNull: false
      }
    });
  };
  return Task;
};
