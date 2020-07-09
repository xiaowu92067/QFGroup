const express = require('express');
const Router = require('./router/router.js');
const bodyParser = require("body-parser");
const app = express();
app.listen(8080);

app.use( express.static("public") );

app.use( bodyParser.urlencoded({
  extended:false
}) );