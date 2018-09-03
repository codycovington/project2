# README GOES HERE



///////////////////////////////////////////////////////////////////////////////////////////
this is a list of the classes and IDs that connect the front and the back end. 
Logic.js is the script that will send the user input to the back end. logic.js is in main.handlebars instead of each individual files. 
put.handlebars uses all the logic and is now the index page, project, tasks, and user.handlebars are not 100% necessary but we could utilize them in case just one of the tables needs to be accessed. 

data-id="{{this.id}}"" will use handlebars to give and id # to the delete button to call the AJAX delete, this goes for Projects, Users, and Tasks.

Project handling
class="project-form" contains the form for the project input 
id="new-project" submits the input to become a new project
data-id="{{this.id}}"" will use handlebars to give and id # to the delete button to call the AJAX delete, this goes for Projects, Users, and Tasks.

User handling
class="user-form" contains the form for the user input
id="new-user" submits the username to the database
id="project-id" a project id must be used to give the user to a specific project

Task handling
class="task-form" contains the form for the task input
id="new-task" this will submit to the task_name column. 
id="task-category this will submit to the category column. If we want to have set categorys we may need to change this to a list or radio buttons that are set with values of the proper categories. 
id="user-task" this gives the task to the specific user. the task table requires this so it won't crash. 