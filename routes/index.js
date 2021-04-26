var express = require("express");
var router = express.Router();

/* GET home page.which has the input field for the room id and room name */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/**this field doesnot belong to this project- ignore it */
router.get("/timer", function (req, res, next) {
  res.render("timer", { title: "Express" });
});
module.exports = router;
