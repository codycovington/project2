var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.render("index", {
        task: dbTasks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/tasks/:id", function(req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function(dbTask) {
      res.render("example", {
        task: dbTask
      });
    });
  });


  //get users
  app.get("/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.render("User", {
        User: dbUsers,
      });
    });
  });

  // get projects
  app.get("/projects", function(req, res) {
    db.Project.findAll({}).then(function(dbProjects) {
      res.render("projects", {
        Project: dbProjects,
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
