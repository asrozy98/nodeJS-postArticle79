var express = require("express");
var app = express();
const router = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(8000, function () {
  console.log("Server is running on port 3000");
});
