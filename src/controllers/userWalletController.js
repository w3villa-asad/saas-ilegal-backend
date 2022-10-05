const UserWalletService = require("../services/UserWalletService");
// import { Alchemy, Network } from "alchemy-sdk";
const UserWallet = require("../models/BlockchainSchema");

const createWallet = async (req, res) => {
  try {
    const Wallet = await UserWalletService.createWallet(req, res);
    // res.status(200).send(Wallet);
  } catch (error) {
    console.log(error);
  }
};

const getEthBalance = async (req, res) => {
  try {
    const WalletBalance = await UserWalletService.getEthBalance(req, res);
    console.log("new error");
  } catch (error) {
    console.log(error);
  }
};

// exports.getUtilityBalance = async (req, res, next) => {
//   try {
//     const WalletBalance = await UserWalletService.getBalance(req, res);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// exports.getNFT_Info = async (req, res, next) => {
//   let { tokenID } = req.params;
//   try {
//     if (tokenID) {
//       const tokenInfo = await UserWalletService.getNFT_Info(req, res, tokenID);
//     } else {
//       res.send("please provide userID");
//     }
//   } catch (error) {
//     console.log("Error Occurred >>", error);
//     next(error);
//   }
// };

// exports.transferQANOON = async (req, res, next) => {
//   try {
//     const Wallet = await UserWalletService.transfer_QANOON(req, res);
//   } catch (error) {
//     console.log(error);
//   }
//   // let { tokenValue, reciever } = req.params;

//   // if(!tokenValue){
//   //   res.send("please provide Token Value");
//   // }
//   // if(!reciever){
//   //   res.send("please provide reciever address");
//   // }

//   // try {
//   //   if (! tokenValue Reciever) {
//   //     const tokenInfo = await UserWalletService.getNFT_Info(req,res,tokenID);
//   //   } else {
//   //     res.send("please provide Token Value");
//   //   }
//   // } catch (error) {
//   //   console.log("Error Occurred >>", error);
//   //   next(error);
//   // }
// };
// exports.transferHistory = async (req, res) => {
//   try {
//     // Setup: npm install alchemy-sdk

//     let userWallet = await UserWallet.findOne({ User_id: req.user.id });
//     if (!userWallet) {
//       res.status(400).json({
//         success: false,
//         message: "wallet not found",
//         data: "",
//       });
//     } else {
//       // let userWalletKey = decrypt(userWallet.private_key);
//       const config = {
//         apiKey: "ZuEYyKLqeVaumEL4MGRaYfBrFVVLNcAB",
//         network: Network.ETH_ROPSTEN,
//       };
//       const alchemy = new Alchemy(config);

//       const data = await alchemy.core.getAssetTransfers({
//         fromBlock: "0x0",
//         fromAddress: userWallet.address,
//         category: ["external", "internal", "erc20", "erc721", "erc1155"],
//       });

//       console.log(data);
//       res.status(200).json({
//         success: true,
//         message: "wallet transactions",
//         data: data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
module.exports = {
  createWallet,
  getEthBalance
}