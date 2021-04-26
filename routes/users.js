var express = require("express");
var router = express.Router();

/**Not in use...Only for API testing */
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.patch("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.put("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.delete("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
