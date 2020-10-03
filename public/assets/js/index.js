$(function() {
    //need ot change
    $(".change-eaten").on("click", function(event) {
        var id = $(this).data("id");
        var eaten = $(this).data("eaten");
        var name = $(this).data("name");
        var newState = {
            burger_name: name,
            devoured: eaten
        };
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: newState
        }).then(function() {
            console.log("changed eaten to", eaten);
            location.reload();
        });
    });
    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#b_name").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("created new burger");
            location.reload();
        });
    });
    $(".delete").on("click", function(event) {
        var id = $(this).data("id");
        $.ajax("/api/burger/" + id, {
            type: "DELETE"
        }).then(function() {
            console.log("deleted burger", id);
            location.reload();
        });
    });
});