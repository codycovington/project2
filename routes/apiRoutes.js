var db = require("../models");

module.exports = function (app) {

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
  app.post("/api/task", function (req, res) {
    db.Task.create(req.body).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  //update a task
  app.put("/api/task", function(req, res) { 
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
  app.delete("/api/task/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });
};
