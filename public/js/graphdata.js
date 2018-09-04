$( document ).ready(function() {
    console.log( "ready!" );


$.ajax({ 
    type: 'GET', 
    url: '/api/graphdata', 
    data: { get_param: 'value' }, 
    success: function (data) { 
        var names = data
        //console.log(data[0], data[1]);
        //$('#test').html(data);
        buildBarChartGraph(data[0], data[1], data[2]);
        buildPieChart(data[0], data[1], data[2]);
    }
});

function buildBarChartGraph(completed, in_progress, todo) {
    console.log(completed, in_progress);

    var completed_label = completed;
    var in_progress_label = in_progress;
    var todo_label = todo;
    console.log(todo_label);

    var ctx = document.getElementById("barChart");

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Completed", "In-Progress", "Todo"],
        datasets: [{
            label: "Overview of Tasks",
            data: [completed_label, in_progress_label, todo_label],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
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
                    beginAtZero:true
                }
            }]
        },
        responsive: false,
        title: {
            display: true,
            text: 'Seisan: Project Overview'
        }
    }
});
}

function buildPieChart(completed, in_progress, todo) {

    new Chart(document.getElementById("pieChart"), {
        type: 'doughnut',
        data: {
          labels: ["Completed", "In Progress", "Todo"],
          datasets: [
            {
              label: "Seisan: Tasks Overview",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [completed, in_progress, todo]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Pie Chart View'
          },
          responsive: false
        }
    });
}

});