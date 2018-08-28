var db = require("../models");

module.exports = function (app) {


  // Get all projects
  app.get("/api/projects", function (req, res) {

    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    };

    db.Project.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbtask) {
      res.json(dbtask);
    });
  });

  // Create a new Project
  app.post("/api/project", function (req, res) {
    db.Project.create(req.body).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  // Update a Project
  app.put("/api/project", function(req, res) { 
    db.Project.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTask){
        res.json(dbTask)
      });
  });

  // Delete a Project by id
  app.delete("/api/project/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });
  
  //==========================================================================//

  // Get all tasks
  app.get("/api/tasks", function (req, res) {

    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    };

    db.Task.findAll({
      where: query,
      include: [db.User]
    }).then(function (dbtask) {
      res.json(dbtask);
    });
  });

  //Get a single task
  app.get("/api/posts/:id", function (req, res) {
    db.Task.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  // Create a new Task
  app.post("/api/tasks", function (req, res) {
    db.Task.create(req.body).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  //update a task
  app.put("/api/tasks", function(req, res) { 
    db.Task.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTask){
        res.json(dbTask)
      });
  });

  // Delete a Task by id
  app.delete("/api/tasks/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });
};
