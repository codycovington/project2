var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Task.findAll({}).then(function(dbTasks) {
      res.render("index", {
        msg: "Tasks!",
        tasks: dbTasks
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/tasks/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbTask) {
      res.render("example", {
        example: dbTask
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
