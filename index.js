const express = require("express");
const app = require('./src/app');
const port = process.env.PORT || 3000;
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')
app.get("/", (req, res)=>{
  res.send("Hey There");
});
app.set('port', port);

app.listen(port, ()=>{
    console.log("Express server listening on port %d in %s mode");
  });