$(document).ready(function () {


    $(".login").on("click", function () {
        var id = $(this).data(id);
        window.location.href = `/kanban/${id.id}`;

    });

});