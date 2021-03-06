var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    });
});
router.post("/api/burger", function(req, res) {
    burger.insertOne(["burger_name", "devoured"], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});
router.put("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    // console.log("condition: ", condition);
    burger.updateOne({
        burger_name: req.body.burger_name,
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) return res.status(404).end();
        else res.status(200).end();
    });
});
router.delete("/api/burger/:id", function(req, res) {
    burger.deleteOne(req.params.id, function(result) {
        if (result.affectedRows == 0) return res.status(404).end();
        else res.status(200).end();
    });
});
// Export routes for server.js to use.
module.exports = router;