$(document).ready(function () {
    //============================================================================//
    // Project logic

    var $newProject = $("#new-project");
    
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

    // handles deleting the project
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
        // this grabs the values from the radio buttons 
        var selValue = $("input[name=category]:checked").val();
        console.log(selValue);

        //holds the values of the inputs to be pushed to the database
        var $newTask = $("#new-task");
        var $taskCategory = selValue;
        
        console.log("Category: " + $taskCategory);
        console.log($taskCategory);

        // this prevents premature submission without the required fields
        if (!$newTask.val().trim() || !$taskCategory ) {
            alert("Please complete all fields in order to move forward.");
            return
        };

        //the newTask holds the user input and sets them to the database columns
        var newTask = {
            task_name: $newTask.val().trim(),
            category: $taskCategory,
            
        };
        console.log(newTask)

        //the ajax call posts the new task to the total api
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
        //grabs the id of the task
        var id = $(this).data(id);

        console.log(id.id)

        //ajax call to use the id to delete the specific task from the database
        $.ajax("/api/tasks/" + id.id, {
            type: "DELETE",
            url: "/api/tasks/" + id.id
        }).then(function () {
            console.log(id + " has been deleted")
            location.reload();
        });
    });

    //handles the updating of a task
    $(".updateValue").on("click", function (event) {
        event.preventDefault();
        //grab the id and input from the form to know the id of the task to update and the category
        //selvalue is the selected value of the radio buttons and is later set to the $updateCategory
        var id = $(this).data(id);
        var selValue = $("input[name=category]:checked").val();
        console.log(id.id)
        console.log(selValue)

        
        var $updateCategory = selValue;

        // this is the object that contains the task id and the category that needs to be updated
        var update = {
            id: id.id,
            category: $updateCategory
        };
        console.log("id updated: " + id.id);
        console.log("category updated: " + $updateCategory);

        // ajax call that uses the id of the task to update the content with the update object
        $.ajax("/api/tasks/" + id.id, {
            method: "PUT",
            url: "/api/tasks/" + id.id,
            data: update
        }).then(function () {
            console.log("updated");
            location.reload();
        });
    });




});


