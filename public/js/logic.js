$(document).ready(function () {
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
    $(".login").on("click", function () {
        var id = $(this).data(id);
        window.location.href = `/kanban/${id.id}`;

    });

    // Get references to page elements
    var $newUser = $("#new-user");
    // var $userProjectId = $("#project-id");


    // handles the input in the user-form class and enters the id  new-user to put it into the database
    $(".user-form").on("submit", function (event) {
        event.preventDefault();

        // this prevents premature submission without the required fields
        if (!$newUser.val().trim()) {
            alert("Please complete all fields in order to move forward.");
            return
        }

        var newUser = {
            name: $newUser.val().trim()
            // ProjectId: $userProjectId.val().trim()
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
        if (!$newTask.val().trim() || !$taskCategory) {
            alert("Please complete all fields in order to move forward.");
            return
        };

        var newTask = {
            task_name: $newTask.val().trim(),
            category: $taskCategory
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
    });

});


//modal logic

// Trigger modals
(function () {
    var modalFX = (function () {
        var elements = {
            target: 'data-target',
            active: 'is-active',
            button: '.modal-button',
            close: '.modal-close',
            buttonClose: '.modal-button-close',
            background: '.modal-background'
        };
        var onClickEach = function (selector, callback) {
            var arr = document.querySelectorAll(selector);
            arr.forEach(function (el) {
                el.addEventListener('click', callback);
            })
        };
        var events = function () {
            onClickEach(elements.button, openModal);
            onClickEach(elements.close, closeModal);
            onClickEach(elements.buttonClose, closeAll);
            onClickEach(elements.background, closeModal);
            // Close all modals if ESC key is pressed
            document.addEventListener('keyup', function(key){
                if(key.keyCode == 27) {
                    closeAll();
                }
            });
        };
        var closeAll = function() {
            var openModal = document.querySelectorAll('.' + elements.active);
            openModal.forEach(function (modal) {
                modal.classList.remove(elements.active);
            })
            unFreeze();            
        };
        var openModal = function () {
            var modal = this.getAttribute(elements.target);
            freeze();
            document.getElementById(modal).classList.add(elements.active);
        };
        var closeModal = function () {
            var modal = this.parentElement.id;
            document.getElementById(modal).classList.remove(elements.active);
            unFreeze();
        };
        // Freeze scrollbars
        var freeze = function () {
            document.getElementsByTagName('html')[0].style.overflow = "hidden"
            document.getElementsByTagName('body')[0].style.overflowY = "scroll";
        };
        
        var unFreeze = function () {
            document.getElementsByTagName('html')[0].style.overflow = ""
            document.getElementsByTagName('body')[0].style.overflowY = "";
        };
        return {
            init: function () {
                events();
            }
        }
    })();
    modalFX.init();
})();

!function(){var t,n,e,o,l,c,a,d,i,m,u,s;(t="data-target",n="is-active",e=".modal-button",o=".modal-close",l=".modal-button-close",c=".modal-background",a=function(e,t){document.querySelectorAll(e).forEach(function(e){e.addEventListener("click",t)})},d=function(){document.querySelectorAll("."+n).forEach(function(e){e.classList.remove(n)}),s()},i=function(){var e=this.getAttribute(t);u(),document.getElementById(e).classList.add(n)},m=function(){var e=this.parentElement.id;document.getElementById(e).classList.remove(n),s()},u=function(){document.getElementsByTagName("html")[0].style.overflow="hidden",document.getElementsByTagName("body")[0].style.overflowY="scroll"},s=function(){document.getElementsByTagName("html")[0].style.overflow="",document.getElementsByTagName("body")[0].style.overflowY=""},{init:function(){a(e,i),a(o,m),a(l,d),a(c,m),document.addEventListener("keyup",function(e){27==e.keyCode&&d()})}}).init()}();