const express = require("express");
const app = require('./src/app');
const ethers = require("ethers");
const port = process.env.PORT || 3000;
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')
app.get("/", (req, res)=>{
  res.send("Hey There");
});
app.set('port', port);

app.post("/createWallet", (req,res)=>{
  try {
    // let walletFound = await UserWallet.findOne({ User_id: req.user.id });
    // if (walletFound) {
    //   res.status(409).json({
    //     success: false,
    //     message: "wallet already exist!",
    //     data: walletFound,
    //   });
    // } 
    // else {
      console.log("i ma in the createWalte")
      const wallet = ethers.Wallet.createRandom();
      // new_details = wallet;
      const encryptedPrivateKey = wallet.privateKey;
      const mnemonics = wallet.mnemonics;
      console.log("i ma in the")
      // const userWallet = new UserWallet({
      //   User_id: req.user.id,
      //   address: wallet.address,
      //   private_key: encryptedPrivateKey,
      // });
      // await userWallet.save();
      res.status(200).json({
        success: true,
        message: "wallet created successfully!",
        data: wallet,
        privateKey: encryptedPrivateKey,
        mnemonics: mnemonics

      });
    // }
  } 
  catch (error) {
    throw new Error(error);
  }
});

app.listen(port, ()=>{
    console.log("Express server listening on port %d in %s mode");
  });