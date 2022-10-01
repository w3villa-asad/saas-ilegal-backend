const express = require("express");
const app = require('./src/app');
const contracts = require("./src/contracts/provider");
const ethers = require("ethers");
const QANOON_TOKEN_ADD = "0x7ef271C4A0C41080f214d801521d1E3B7DcAe144";
const QANOON_TOKEN_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "_admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_initialSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_isAdmin",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_maxSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_timestamps",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "mintAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const privateKey = "fca9e96d3964e6a41485ef34a43555ca675cb3aeb4f6c89ffe2cabe69cc3c5ff";

// console.log(private_key.privateKey)
// let privateKey = private_key.privateKey;

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/rP1ruMXTsu52w677aIgYnn5uPSv7VY6N");
let wallet = new ethers.Wallet(privateKey); //can you provide with your add private key , ans : yes i provided mine, only.ok
let walletSigner = wallet.connect(provider);


let QANOON_Contract = new ethers.Contract(
  QANOON_TOKEN_ADD,
  QANOON_TOKEN_ABI,
  walletSigner
);
let QANOON_DOC = contracts.QANOON_DOC_Contract;
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

app.post("/mintQANOON", async (req, res)=>{
  try{
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account",typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);
    
    let tx = await QANOON_Contract.mint(recieverAccount,recieverAmount);
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    // 
    res.status(200).json({
        success: true,
        message: recieverAmount + " Qanoon is minted to " + recieverAccount,
        data: tx,
      });
      return tx;
    }
      catch (error) {
        throw new Error(error);
      }
});

app.listen(port, ()=>{
    console.log("Express server listening on port %d in %s mode");
  });