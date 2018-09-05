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
    db.Task.findAll({ 
      where: { 
        UserId: req.params.id 
    } 
  }).then(function (dbTasks) {
      res.render("Tasks", {
        Task: dbTasks
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

// Get the graphdata to the page
app.get("/graphdata", function (req, res) {
  res.render("graphdata");
});

 // MAIN KANBAN GET METHOD FOR DASHBOARD =====================================//
 app.get("/kanban/:id", function (req, res) {

  const completed_column = 
  db.Task.findAll({ 
    where: { 
      UserId: req.params.id,
      category: "completed"
  }})
 
  const inprogress_column = 
  db.Task.findAll({ 
    where: { 
      UserId: req.params.id,
      category: "in-progress"
  }});

  const todo_column = 
  db.Task.findAll({ 
    where: { 
      UserId: req.params.id,
      category: "todo"
  }});

  const icebox_column = 
  db.Task.findAll({ 
    where: { 
      UserId: req.params.id,
      category: "icebox"
  }});

  Promise
  .all([completed_column, inprogress_column, todo_column, icebox_column])
  .then(function (dbtasks) {

    async function asyncCall() {
    // console.log(dbtasks[0],dbtasks[1],dbtasks[2],dbtasks[3]);
    // console.log("Async function executed");
    await res.render("Tasks", {
      Completed: dbtasks[0],
      InProgress: dbtasks[1],
      Todo: dbtasks[2],
      Icebox: dbtasks[3]
    });
   }
    asyncCall();
  });
});
//===========================================================================//

 // Load example page and pass in an example by id
 app.get("/in-progress/:id", function (req, res) {
  db.Task.findAll({ 
    where: { 
      UserId: req.params.id,
      category: "in-progress"
  } 
}).then(function (dbTasks) {
    res.render("Tasks", {
      Task: dbTasks
    });
  });
});

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
