var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static("dist"));

app.get("*", function(req, res, next) {
  res.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(process.env.PORT || 4000, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at http://localhost:4000");
});
