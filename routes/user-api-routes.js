var db = require("../models");

module.exports = function(app){
    
    //the include property will bring in the user's tasks 

    app.get("/api/users", function(req, res) {
        db.User.findAll({
            include: [db.Task]
        }).then(function(dbUser) {
            res.json(dbUser)
        });
    });

    //this will find one user and the tasks that belong to them
    app.get("/api/users/:id", function(req, res) {
        db.User.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Task]
        }).then(function(dbUser){
            res.json(dbUser);
        });
    });

    //this will delete the user and it's task
    app.delete("/api/users/:id", function(req, res) {
        db.User.destroy({
            where: {
                id: rq.params.id
            }
        }).then(function(dbUser){
            res.json(dbUser)
        });
    });

};