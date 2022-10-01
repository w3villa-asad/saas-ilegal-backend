
const express = require("express");
const routes = require("../src/routes/api/createWallet");
const bodyParser = require("body-parser");
// require("./config/passport");
const cors = require("cors");
// require("./db/models");
// require("newrelic");
// const swaggerUi = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const fileUpload = require("express-fileupload");

const app = express();
app.use("/", routes);
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: "true" })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json


module.exports = app;
