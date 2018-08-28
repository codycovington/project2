// Get references to page elements
var $newTask = $("#new-task");
var $taskDescription = $("#task-description");
var $submitBtn = $("#submit");
var $taskLists = $("#task-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTask: function(task) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tasks",
      data: JSON.stringify(task)
    });
  },
  getTasks: function() {
    return $.ajax({
      url: "api/tasks",
      type: "GET"
    });
  },
  deleteTasks: function(id) {
    return $.ajax({
      url: "api/tasks/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshTasks = function() {
  API.getTasks().then(function(data) {
    var $tasks = data.map(function(task) {
      var $a = $("<a>")
        .text(task.text)
        .attr("href", "/task/" + task.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": task.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $taskLists.empty();
    $taskLists.append($tasks);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var task = {
    text: $newTask.val().trim(),
    description: $taskDescription.val().trim()
  };

  //we don't have a task.description.
  if (!(task.text && task.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveTask(task).then(function() {
    refreshTasks();
  });

  $newTask.val("");
  $taskDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTasks(idToDelete).then(function() {
    refreshTasks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$taskLists.on("click", ".delete", handleDeleteBtnClick);
