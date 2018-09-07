$(document).ready(function () {
    console.log("ready!");


    $.ajax({
        type: 'GET',
        url: '/api/graphdata',
        data: { get_param: 'value' },
        success: function (data) {
            var names = data
            //console.log(data[0], data[1]);
            //$('#test').html(data);

            buildBarChartGraph(data[0], data[1], data[2], data[3]);
            buildPieChart(data[0], data[1], data[2], data[3]);

            rewardRank(data[0]);
        }
    });


    // Build the bar chart

    function buildBarChartGraph(completed, in_progress, todo, icebox) {

        console.log(completed, in_progress);

        var completed_label = completed;
        var in_progress_label = in_progress;
        var todo_label = todo;

        var icebox_label = icebox;


        var ctx = document.getElementById("barChart");

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {

                labels: ["Completed", "In-Progress", "Todo", "IceBox"],
                datasets: [{
                    label: "Overview of Tasks",
                    data: [completed_label, in_progress_label, todo_label, icebox_label],

                    backgroundColor: [
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(153, 102, 255, 0.4)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 20,
                            fontColor: "white"
                        }
                    }]
                },
                responsive: false,
                title: {
                    display: true,
                    fontColor: "white",
                    fontSize: 20,
                    text: 'Seisan: Tasks Overview'
                }
            }
        });
    }

    // Build the pie chart

    function buildPieChart(completed, in_progress, todo, icebox) {


        new Chart(document.getElementById("pieChart"), {
            type: 'doughnut',
            data: {

                labels: ["Completed", "In Progress", "Todo", "Icebox"],

                datasets: [
                    {
                        label: "Seisan: Tasks Overview",
                        backgroundColor: ["rgb(62,149,205,0.5)", "rgb(142,94,162, 0.5)", "rgb(60,186,159, 0.5)", "rgb(232,195,185, 0.5)", "#c45850"],
                        fontSize: 20,
                        fontColor: "white",

                        data: [completed, in_progress, todo, icebox]

// =======

//     // Build the bar chart

//     function buildBarChartGraph(completed, in_progress, todo, icebox) {

//         console.log(completed, in_progress);

//         var completed_label = completed;
//         var in_progress_label = in_progress;
//         var todo_label = todo;

//         var icebox_label = icebox;


//         var ctx = document.getElementById("barChart");

//         var myChart = new Chart(ctx, {
//             type: 'bar',
//             data: {

//                 labels: ["Completed", "In-Progress", "Todo", "IceBox"],
//                 datasets: [{
//                     label: "Overview of Tasks",
//                     data: [completed_label, in_progress_label, todo_label, icebox_label],

//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.2)',
//                         'rgba(54, 162, 235, 0.2)',
//                         'rgba(255, 206, 86, 0.2)',
//                         'rgba(75, 192, 192, 0.2)',
//                         'rgba(153, 102, 255, 0.2)',
//                         'rgba(255, 159, 64, 0.2)'
//                     ],
//                     borderColor: [
//                         'rgba(255,99,132,1)',
//                         'rgba(54, 162, 235, 1)',
//                         'rgba(255, 206, 86, 1)',
//                         'rgba(75, 192, 192, 1)',
//                         'rgba(153, 102, 255, 1)',
//                         'rgba(255, 159, 64, 1)'
//                     ],
//                     borderWidth: 1
//                 }]
//             },
//             options: {
//                 scales: {
//                     yAxes: [{
//                         ticks: {
//                             beginAtZero: true
//                         }
//                     }]
//                 },
//                 responsive: false,
//                 title: {
//                     display: true,
//                     text: 'Seisan: Project Overview'
//                 }
//             }
//         });
//     }

//     // Build the pie chart

//     function buildPieChart(completed, in_progress, todo, icebox) {


//         new Chart(document.getElementById("pieChart"), {
//             type: 'doughnut',
//             data: {

//                 labels: ["Completed", "In Progress", "Todo", "Icebox"],

//                 datasets: [
//                     {
//                         label: "Seisan: Tasks Overview",
//                         backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],

//                         data: [completed, in_progress, todo, icebox]

// >>>>>>> master
                    }
                ]
            },
            options: {
                title: {
                    display: true,

                    fontSize: 20,
                    fontColor: "white",
                    text: 'Pie Chart View'
                },
                responsive: false,
                legend: {
                    labels: {
                        fontColor: '#ffffff'
                     }
                }

            }
        });
    }

    // Determine the rank and then post it accordingly using jquery!
    function rewardRank(completed) {
        var level = parseInt(completed);
        console.log("Number of completed tasks: " + completed);

        if (level < 5) {
            console.log("Task newbie");
            $("#rank").html("<h1> Current Level: Task Newbie! </h1>");
        } else if (level >= 5 && level <= 10) {
            console.log("Productive person");
            $("#rank").html("Current Level: Productive Person!");
        } else if (level > 10) {

            console.log("Task Wizard");
            $("#rank").html("<strong>Rank:</strong> Zensei of Tasks");

        }
    }

});