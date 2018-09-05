$( document ).ready(function() {


    $(".login").on("click", function () {
        var id = $(this).data(id);
        window.location.href = `/kanban/${id.id}`;
        // console.log(id.id)
     
        // $.ajax("/tasks/" + id.id, {
        //     type: "GET",
        //     url: "/tasks/" + id.id
        // }).then(function () {
        //     console.log(id.id + " has been selected")
        //     //location.reload();
        // });
     });

});