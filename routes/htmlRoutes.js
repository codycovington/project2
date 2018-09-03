//require our different models 
var db = require("../models");

module.exports = function (app) {
  // Load index page

  //This will load the index page, which will allow Projects, Users, and Tasks to be added and viewed 
  // the "put.handlebars" still needs to be worked on so that certain data can be called in. 
  app.get("/", function (req, res) {
    db.Project.findAll({}).then(function (dbProjects) {
      db.User.findAll({}).then(function (dbUsers) {
        db.Task.findAll({}).then(function (dbTasks) {
          return res.render("put", {
            Project: dbProjects,
            User: dbUsers,
            Task: dbTasks
          });
        });
      });
    });
  });

  // get task displayed to the page
  app.get("/tasks", function (req, res) {
    db.Task.findAll({}).then(function (dbTasks) {
      res.render("Tasks", {
        Task: dbTasks,
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/tasks/:id", function (req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function (dbTask) {
      res.render("example", {
        task: dbTask
      });
    });
  });


  //get users displyed to page
  app.get("/users", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.render("User", {
        User: dbUsers,
      });
    });
  });

  //get projects displayed to page
  app.get("/project", function (req, res) {
    db.Project.findAll({}).then(function (dbProjects) {
      res.render("Project", {
        Project: dbProjects
      });
    });
  });



  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
