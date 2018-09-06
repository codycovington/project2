//============================================================================//
// Project logic

var $newProject = $("#new-project");
// var $userProject = $("#user-project");
// handles the input in the user-form class and enters the id  new-user to put it into the database
$(".project-form").on("submit", function (event) {
    event.preventDefault();

    // this prevents premature submission without the required fields
    if (!$newProject.val().trim()) {
        alert("Please complete all fields in order to move forward.");
        return
    }
    var newProject = {
        project_Name: $newProject.val().trim()
    };
    console.log(newProject)

    $.ajax("/api/projects", {
        type: "POST",
        data: newProject
    }).then(function () {
        console.log("New Project added: " + newProject)
        location.reload();
    });
});

// handles deleting the user
$(".delete").on("click", function () {
    var id = $(this).data(id);

    console.log(id.id)

    $.ajax("/api/projects/" + id.id, {
        type: "DELETE",
        url: "/api/projects/" + id.id
    }).then(function () {
        location.reload();
    });
});



// ========================================================================//
//user logic

// Get references to page elements
var $newUser = $("#new-user");
var $userProjectId = $("#project-id");


// handles the input in the user-form class and enters the id  new-user to put it into the database
$(".user-form").on("submit", function (event) {
    event.preventDefault();

    // this prevents premature submission without the required fields
    if (!$newUser.val().trim() || !$userProjectId.val().trim()) {
        alert("Please complete all fields in order to move forward.");
        return
    }

    var newUser = {
        name: $newUser.val().trim(),
        ProjectId: $userProjectId.val().trim()
    };
    console.log(newUser)

    $.ajax("/api/users", {
        type: "POST",
        data: newUser
    }).then(function () {
        console.log("New user added: " + newUser)
        location.reload();
    });
});

// handles deleting the user
$(".delete").on("click", function () {
    var id = $(this).data(id);

    console.log(id.id)

    $.ajax("/api/users/" + id.id, {
        type: "DELETE",
        url: "/api/users/" + id.id
    }).then(function () {
        location.reload();
    })
});


// ========================================================================//
// Task Logic
$("#getValue").click(function (event) {
    event.preventDefault();
    var selValue = $(".dropdown").val();
    console.log(selValue)


    var $newTask = $("#new-task");
    var $taskCategory = selValue;
    var $UserId = $("#user-task");
    console.log("Category: " + $taskCategory)
    // handles the input in the task-form class and enters the id  task-user to put it into the database


    console.log($taskCategory)

    // this prevents premature submission without the required fields
    if (!$newTask.val().trim() || !$taskCategory || !$UserId) {
        alert("Please complete all fields in order to move forward.");
        return
    };

    var newTask = {
        task_name: $newTask.val().trim(),
        category: $taskCategory,
        UserId: $UserId.val().trim()
    };
    console.log(newTask)

    $.ajax("/api/tasks", {
        type: "POST",
        data: newTask
    }).then(function () {
        console.log("New task added: " + newTask)
        location.reload();
    });
});



// handles deleting the task
$(".delete").on("click", function () {
    var id = $(this).data(id);

    console.log(id.id)

    $.ajax("/api/tasks/" + id.id, {
        type: "DELETE",
        url: "/api/tasks/" + id.id
    }).then(function () {
        console.log(id + " has been deleted")
        location.reload();
    });
});

//handles the updating of a task
$(".updateValue").click(function (event) {
    var id = $(this).data(id);
    var selValue = $(".update_task").val();
    console.log(id.id)
    console.log(selValue)


    var $updateCategory = selValue;
    var $updateUser = $("#update-user");

    var update = {
        id: id.id,
        category: $updateCategory
    };
    console.log("id updated: " + id.id);
    console.log("category updated: " + $updateCategory);

    $.ajax("/api/tasks/" + id.id, {
        method: "PUT",
        url: "/api/tasks/" + id.id,
        data: update
    }).then(function () {
        console.log("updated");
        window.location.reload();
    });
})




