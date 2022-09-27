import dbConfig from "../../config/database";

("use strict");

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const basename = path.basename(__filename);
import { DATABASE_URL, DATABASE_LOCAL_URL } from "";

/**
 * Add Databases
 * Make connections
 * */

const db = {};

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then((result) =>
    console.log("✅ Database connection has been established successfully.")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
