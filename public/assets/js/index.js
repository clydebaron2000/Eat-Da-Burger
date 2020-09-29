// Make sure we wait to attach our handlers until the DOM is fully loaded.
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
        // Send the PUT request.
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: newState
        }).then(function() {
            console.log("changed eaten to", eaten);
            // Reload the page to get the updated list
            location.reload();
        });
    });
    $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var newBurger = {
            burger_name: $("#b_name").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };
        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        });
    });
    // $(".delete").on("click", function(event) {
    //     var id = $(this).data("id");
    //     // Send the DELETE request.
    //     $.ajax("/api/burger/" + id, {
    //         type: "DELETE"
    //     }).then(function() {
    //         console.log("deleted burger", id);
    //         // Reload the page to get the updated list
    //         location.reload();
    //     });
    // });
});