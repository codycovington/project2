//============================================================================//
//user logic

// Get references to page elements
var $newUser = $("#new-user");


// handles the input in the user-form class and enters the id  new-user to put it into the database
$(".user-form").on("submit", function (event){
    event.preventDefault();
    
    var newUser = {
        name: $newUser.val().trim()
    };
    console.log(newUser)

    $.ajax("/api/users", {
        type: "POST",
        data: newUser
    }).then (function(){
        console.log("New user added: " + newUser)
        location.reload();
    });
});

// handles deleting the user
$(".delete").on("click", function (){
    var id = $(this).data(id);
    
    console.log(id.id)
    
    $.ajax("/api/users/" + id.id, {
        type: "DELETE",
        url: "/api/users/" + id.id
    }).then(function(){
        location.reload();
    })
})

// ========================================================================//
// Project logic

var $newProject = $("#new-project");
var $userProject = $("#user-project");
// handles the input in the user-form class and enters the id  new-user to put it into the database
$(".project-form").on("submit", function (event){
    event.preventDefault();
    
    var newProject = {
        project_Name: $newProject.val().trim()
    };
    console.log(newProject)

    $.ajax("/api/projects", {
        type: "POST",
        data: newProject
    }).then (function(){
        console.log("New Project added: " + newProject)
        location.reload();
    });
});

// handles deleting the user
$(".delete").on("click", function (){
    var id = $(this).data(id);
    
    console.log(id.id)
    
    $.ajax("/api/projects/" + id.id, {
        type: "DELETE",
        url: "/api/projects/" + id.id
    }).then(function(){
        location.reload();
    });
});


// ========================================================================//
// Task Logic

var $newTask = $("#new-task");
var $taskCategory = $("#task-category");
var $UserId = $("#user-task");

// handles the input in the task-form class and enters the id  task-user to put it into the database
$(".task-form").on("submit", function (event){
    event.preventDefault();
    
    var newTask = {
        task_name: $newTask.val().trim(),
        category: $taskCategory.val().trim(),
        UserId: $UserId.val().trim()
    };
    console.log(newTask)

    $.ajax("/api/tasks", {
        type: "POST",
        data: newTask
    }).then (function(){
        console.log("New task added: " + newTask)
        location.reload();
    });
});

// handles deleting the task
$(".delete").on("click", function (){
    var id = $(this).data(id);
    
    console.log(id.id)
    
    $.ajax("/api/tasks/" + id.id, {
        type: "DELETE",
        url: "/api/tasks/" + id.id
    }).then(function(){
        location.reload();
    });
});
