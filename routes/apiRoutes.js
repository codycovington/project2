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
    }).then(function (dbProjects) {
      res.json(dbProjects);
    });
  });

  // Create a new Project
  app.post("/api/projects", function (req, res) {
    db.Project.create(req.body).then(function (dbProjects) {
      res.json(dbProjects);
    });
  });

  // Update a Project
  app.put("/api/projects/:id", function(req, res) { 
    db.Project.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbProjects){
        res.json(dbProjects)
      });
  });

  // Delete a Project by id
  app.delete("/api/projects/:id", function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbProjects) {
      res.json(dbProjects);
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
  // app.get("/api/tasks/:id", function (req, res) {
  //   db.Task.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(function (dbTask) {
  //     res.json(dbTask);
  //   });
  // });

  // Create a new Task
  app.post("/api/tasks", function (req, res) {
    db.Task.create(req.body).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  //update a task
  app.put("/api/tasks/:id", function(req, res) { 
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

  // Grab category counts and send them via API
  app.get("/api/graphdata", function (req, res) {

    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    };
  
    const count_Complete = 
      db.Task.count({ where: { category: "completed" }
    });
  
    const count_InProgress = 
    db.Task.count({ where: { category: "in-progress" }
    });

    const count_Todo =
    db.Task.count({ where: { category: "todo"}
    });


    const count_iceBox =
    db.Task.count({ where: { category: "icebox"}
    });
  
  
    Promise
    .all([count_Complete, count_InProgress, count_Todo, count_iceBox])

    .then(function (dbtask) {
      res.json(dbtask);
  
      var graph_data_array = [];
      var completed_array = [];
      var in_progress_array = [];

      var icebox_array = [];

      var todo_array = [];
      
      completed_array.push(dbtask[0]);
      in_progress_array.push(dbtask[1]);
      todo_array.push(dbtask[2]);

      icebox_array.push(dbtask[3]);
      graph_data_array.push(dbtask[0], dbtask[1], dbtask[2], dbtask[3]);

  
  
  
      console.log(completed_array);
      console.log(in_progress_array);
      console.log(graph_data_array);
    });
  });


  
    app.get("/api/tasks/:id", function (req, res) {
      db.Task.findAll({
        where: {
          UserId: req.params.id
        },
        include: [db.User]
      }).then(function (dbTask) {
        res.json(dbTask);
      });
    });
  

    // var query = {};
    // if (req.query.user_id) {
    //   query.UserId = req.query.user_id;
    // };

  //   var id = $(this).data(id);
  
  //   const findTasksByUser= 
  //     db.Task.findAll({ where: { userid: id }
       
  //   });
  
  //   Promise
  //   .all([findTaskByUser])
  //   .then(function (dbtask) {
  //     res.json(dbtask);
  //     console.log(id + "HELLO");
  //   });
  // });

  };

