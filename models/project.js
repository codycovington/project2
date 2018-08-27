module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      text: {
        type: DataTypes.STRING,
        // this field cannot be NULL
        allowNull: false,
        //this validation makes it be so that the task cannot be blank
        validate: {
          len: [1]
        }
      }
    });
  
    Project.associate = function(models){
      // The Project needs to belong to a User
      Project.belongsTo(models.User, {
        foreignKey: { 
          allowNull: false
        }
      });
    };
    return Project;
  };