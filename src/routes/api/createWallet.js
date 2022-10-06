// import express from "express";
const express = require("express");
// import { createServer } from "http")
// import { requireAuth } from "../../middlewares";
// import { isValid } from "../../middlewares/validToken";
// import UserWalletCtrl from "../../controllers/userWalletController";
const UserWalletCtrl = require("../../controllers/userWalletController");
const mintQanoon = require("../../contracts/mintQanoon");
const balance = require("../../web3-functions/getBalance");
// require("../../controllers/index");

const router = express.Router();


// console.log(

router.post("/createWallet", [UserWalletCtrl.createWallet]);
// // router.get("/NFT_Info/:tokenID", UserWalletCtrl.getNFT_Info);
router.get("/getEthBalance", [UserWalletCtrl.getEthBalance]);
router.post("/mintQAN", [mintQanoon.MintQAN]);
router.post("/createTransfer",[mintQanoon.createTransfer]);
router.post("/mintQANN",[mintQanoon.mintQANN]);
router.get("/balance", [balance.getBalanceOfUser]);
router.post("/createDocument", [mintQanoon.documentCreate]);
router.post("/mintQANAsasi", [mintQanoon.mintASASI]);
router.post("/mintQANRewards", [mintQanoon.mintREWARDS]);
router.post("/mintQANPlus", [mintQanoon.mintPLUS]);
router.post("/mintQANPremium",[mintQanoon.mintPREMIUM]);
router.post("/mintQANComplementary", [mintQanoon.mintCOMPLEMENTARY]);
router.post("/addPlusInvestors", [mintQanoon.addQanPlusInvestors]);
router.post("/addInvestorSupply", [mintQanoon.giveSupplyToInvestor]);

// router.get("/getUtilityBalance", [isValid, UserWalletCtrl.getUtilityBalance]);
// router.post("/transferQANOON",[isValid, UserWalletCtrl.transferQANOON]);
// router.get("/transferHistory",[isValid,UserWalletCtrl.transferHistory]);
// // router.post("/updateRefferalAmount",[isValid, UserWalletCtrl.updateRefferalAmount]);

module.exports = router;