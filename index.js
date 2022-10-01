const express = require("express");
const app = require('./src/app');
const ethers = require("ethers");
const port = process.env.PORT || 3000;
const UserWalletCtrl = require("./src/controllers/userWalletController");
const mintQanoon = require("./src/contracts/mintQanoon");
const balance = require("./src/web3-functions/getBalance");
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')
app.get("/", (req, res)=>{
  res.send("Hey There");
});
app.set('port', port);

app.post("/createWallet", [UserWalletCtrl.createWallet]);
app.get("/getEthBalance", [UserWalletCtrl.getEthBalance]);
app.post("/mintQAN", [mintQanoon.MintQAN]);
app.post("/createTransfer",[mintQanoon.createTransfer]);
app.post("/mintQANN",[mintQanoon.mintQANN]);
app.get("/balance", [balance.getBalanceOfUser]);
app.post("/createDocument", [mintQanoon.documentCreate]);

app.listen(port, ()=>{
    console.log("Express server listening on port %d in %s mode");
  });