const express = require("express");
const app = require("./src/app");
const contracts = require("./src/contracts/provider");
const ethers = require("ethers");

// CONTRACTS ADDRESSES AND ABI DECLARATION

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
const QANOON_DOC_ADD = "0xbC90A94694d0e9Fe228a72fd15c2C390C7cdbDf3";
const QANOON_DOC_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_docType", type: "string" },
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "string", name: "_docParams", type: "string" },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_docType", type: "string" },
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "string", name: "_docParams", type: "string" },
    ],
    name: "create2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_docType", type: "string" },
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "string", name: "_docParams", type: "string" },
    ],
    name: "create2AndSendEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "string", name: "_docType", type: "string" },
      { internalType: "string", name: "_uri", type: "string" },
      { internalType: "string", name: "_docParams", type: "string" },
    ],
    name: "createAndSendEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "documents",
    outputs: [{ internalType: "contract Document", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_index", type: "uint256" }],
    name: "getDocument",
    outputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "string", name: "docType", type: "string" },
      { internalType: "string", name: "uri", type: "string" },
      { internalType: "address", name: "DocAddr", type: "address" },
      { internalType: "uint256", name: "balance", type: "uint256" },
      { internalType: "string", name: "docParams", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const QANOON_ASASI = "0x62c6C7565685B2eb1bf9aC004dDD652821115caB";
const QANOON_ASASI_ABI = [
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "increaseSupply",
    outputs: [],
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

const QANOON_REWARDS = "0xe491AA19c2C478D08eea25Cbf62FE90B714a8CFD";
const QANOON_REWARDS_ABI = [
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
    name: "currentSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "increaseSupply",
    outputs: [],
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

const QANOON_PLUS = "0x588ba925417AEae94005b5D3bd859ADacd0ac5ab";
const QANOON_PLUS_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_qanoonAsasi", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_isInvestor",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
    name: "addInvestor",
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
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "buyUsingAsasi",
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
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "doubleUpSupply",
    outputs: [],
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "increaseSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "issueInvestorSupply",
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
    inputs: [],
    name: "qanoonAsasi",
    outputs: [
      { internalType: "contract IQanoonAsasi", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_account", type: "address" }],
    name: "removeInvestor",
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
  {
    inputs: [
      { internalType: "address", name: "_updateQanoonAsasi", type: "address" },
    ],
    name: "updateAsasi",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const QANOON_PREMIUM = "0xCA8FaB902d336B0f78E1bC38de7B791240E42bbb";
const QANOON_PREMIUM_ABI = [
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "_blacklisted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
    inputs: [],
    name: "getStakers",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
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
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nextStaking",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
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
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "premiumCoins",
    outputs: [
      { internalType: "uint256", name: "stakedBalance", type: "uint256" },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "removeBlacklistedUser",
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
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "setBlacklistedUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_time", type: "uint256" },
      { internalType: "string", name: "uid", type: "string" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "stakers",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
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

const QANOON_COMPLEMENTARY = "0x5D7dBdE67DaEbC8C924A1F8A74d59BaFFe859ec8";
const QANOON_COMPLEMENTARY_ABI = [
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
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
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
    inputs: [],
    name: "maxSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_amount", type: "uint256" },
    ],
    name: "mint",
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
const privateKey =
  "fca9e96d3964e6a41485ef34a43555ca675cb3aeb4f6c89ffe2cabe69cc3c5ff";

// console.log(private_key.privateKey)
// let privateKey = private_key.privateKey;

const provider = new ethers.providers.JsonRpcProvider(
  "https://eth-goerli.g.alchemy.com/v2/rP1ruMXTsu52w677aIgYnn5uPSv7VY6N"
);
let wallet = new ethers.Wallet(privateKey); //can you provide with your add private key , ans : yes i provided mine, only.ok
let walletSigner = wallet.connect(provider);

// // CONTRACTS ADDRESSES AND ABI SIGNING WITH THE WALLET

let QANOON_Contract = new ethers.Contract(
  QANOON_TOKEN_ADD,
  QANOON_TOKEN_ABI,
  walletSigner
);
let QANOON_DOC_Contract = new ethers.Contract(
  QANOON_DOC_ADD,
  QANOON_DOC_ABI,
  walletSigner
);

let QANOON_ASASI_Contract = new ethers.Contract(
  QANOON_ASASI,
  QANOON_ASASI_ABI,
  walletSigner
);

let QANOON_REWARDS_Contract = new ethers.Contract(
  QANOON_REWARDS,
  QANOON_REWARDS_ABI,
  walletSigner
);

let QANOON_PLUS_Contract = new ethers.Contract(
  QANOON_PLUS,
  QANOON_PLUS_ABI,
  walletSigner
);

let QANOON_PREMIUM_Contract = new ethers.Contract(
  QANOON_PREMIUM,
  QANOON_PREMIUM_ABI,
  walletSigner
);

let QANOON_COMPLEMENTARY_Contract = new ethers.Contract(
  QANOON_COMPLEMENTARY,
  QANOON_COMPLEMENTARY_ABI,
  walletSigner
);

// PORT DECLARATION

const port = process.env.PORT || 3000;
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')

// ROUTES DECLARATION

app.get("/", (req, res) => {
  const image =
    "https://cdn.pixabay.com/photo/2018/03/31/05/07/blockchain-3277336__340.png";
  // res.send("<h1" + "WELCOME TO SAAS ILEGAL BLOCKCHAIN SERVER" + " ></h1>");
  res.send(
    "<h1>Hey, There! You Are Currently Running Saas-Ilegal Blockchain Backend Server</h1>"
  );
});
app.set("port", port);

app.post("/createNewWallet", (req, res) => {
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
    // console.log("i ma in the createWalte");
    const wallet = ethers.Wallet.createRandom();
    // new_details = wallet;
    const encryptedPrivateKey = wallet.privateKey;
    const mnemonic = wallet.mnemonic.phrase;
    console.log(mnemonic, "mnemonics");
    // console.log("i a in the");
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
      mnemonics: mnemonic,
    });
    // }
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/mintQANOON", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_Contract.mint(recieverAccount, recieverAmount);
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
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/mintQANAsasi", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_ASASI_Contract.buy(
      recieverAccount,
      ethers.utils.parseUnits(recieverAmount.toString(), 18)
    );
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message:
        recieverAmount + " Qanoon Asasi Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/mintQANRewards", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_REWARDS_Contract.mint(
      recieverAccount,
      ethers.utils.parseUnits(recieverAmount.toString(), 18)
    );
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message:
        recieverAmount + " Qanoon Rewards Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/mintQANPlus", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_PLUS_Contract.buy(
      recieverAccount,
      ethers.utils.parseUnits(recieverAmount.toString(), 18)
    );
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message:
        recieverAmount + " Qanoon Plus Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/mintQANPremium", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, time, uid, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_PREMIUM_Contract.stake(time, uid, recieverAmount);
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message:
        recieverAmount + " Qanoon Premium Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
});

//QANOON_COMPLEMENTARY_Contract

app.post("/mintQANComplementary", async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);

    let tx = await QANOON_COMPLEMENTARY_Contract.mint(
      recieverAccount,
      ethers.utils.parseUnits(recieverAmount.toString(), 18)
    );
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message:
        recieverAmount +
        " Qanoon Complementary Tokens minted to " +
        recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/validateDocument", async (req, res) => {
  try {
    let { docOwnerAddress, docType, docURI, docParams } = req.body;

    // documentCreate
    console.log("docOwnerAdd", docOwnerAddress);
    console.log("document create", req.body);

    let txn = await QANOON_DOC_Contract.create(
      docOwnerAddress,
      docType,
      docURI,
      docParams
    );
    console.log("Transaction", txn);
    res.status(200).json({
      success: true,
      message: "document created successfully!!",
      data: txn,
    });
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userTokenBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userAsasiBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_ASASI_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Asasi Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userRewardsBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_REWARDS_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Rewards Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userPlusBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_PLUS_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Plus Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userPremiumBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_PREMIUM_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Plus Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userComplementaryBalance", async (req, res) => {
  try {
    let { userAdd } = req.body;
    console.log(userAdd, "userAddress");
    // userAdd = req.body;
    console.log(req.body, "user Add");
    let userbalance = await QANOON_COMPLEMENTARY_Contract.balanceOf(userAdd);
    let userbal = await ethers.utils.formatUnits(userbalance, 18);
    console.log(userbalance, "userbalance", userbal, "user bal");
    res.status(200).json({
      succes: true,
      message: "Qanoon Complementary Balance of user " + userAdd,
      data: userbal,
    });
    return ethers.utils.formatUnits(userbalance, 18);
    // return(userbalance);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/userEthBal", async (req, res) => {
  try {
    let { userAdd } = req.body;
    let balance = await provider.getBalance(userAdd);
    let bal = ethers.utils.formatEther(balance);
    res.status(200).json({
      success: true,
      message: "your ether balance is " + bal,
      data: bal,
    });
    return ethers.utils.formatEther(balance);
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/addPlusInvestors", async (req, res) => {
  try {
    let { ownerAdd, userAdd } = req.body;
    console.log("plus investors request body", req.body);
    let ownerAddress = await QANOON_PLUS_Contract.owner();
    console.log("plus investor owner", ownerAddress, ownerAdd);
    if (ownerAdd == ownerAddress) {
      let addInvest = await QANOON_PLUS_Contract.addInvestor(userAdd);
      console.log("plus investors add", addInvest);
      await addInvest.wait();
      // let giveInvestorSupply = await QANOON_PLUS_Contract.issueInvestorSupply(userAdd, ethers.utils.formatUnits(userAmount, 18));
      // await giveInvestorSupply.wait();
      res.status(200).json({
        success: true,
        message: userAdd + "added as investor",
        data: addInvest,
      });
    } else {
      err = "owner can only add Investors";
      return err;
    }
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/addInvestorSupply", async (req, res) => {
  try {
    let { userAdd, userAmount } = req.body;
    let owner = await QANOON_PLUS_Contract._isInvestor(userAdd);
    console.log("plus owner", owner);
    if (owner == true) {
      let sendInvestorSupply = await QANOON_PLUS_Contract.issueInvestorSupply(
        userAdd,
        userAmount
      );
      // res.status
      res.status(200).json({
        success: true,
        message: "you are an investor",
        data: sendInvestorSupply,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "you are not an investor",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

app.post("/addRewardsAdmin", async (req, res)=> {
  try {
    let { ownerAdd, adminAdd } = req.body;
    console.log("rewards admins request body", req.body);
    let ownerAddress = await QANOON_REWARDS_Contract.owner();
    console.log("rewards admins owner", ownerAddress, ownerAdd);
    if (ownerAdd == ownerAddress) {
      let addAdmins = await QANOON_REWARDS_Contract.addAdmin(adminAdd);
      console.log("plus investors add", addAdmins);
      // await addAdmins.wait();
      // let giveInvestorSupply = await QANOON_PLUS_Contract.issueInvestorSupply(userAdd, ethers.utils.formatUnits(userAmount, 18));
      // await giveInvestorSupply.wait();
      res.status(200).json({
        success: true,
        message: adminAdd + " you are added as admin",
        data: addAdmins,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "you are not an admin",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
})

app.post("/giveRewardsToUsers", async (req, res) => {
  try {
    let { adminAdd, userAdd, userAmount } = req.body;
    let admin = await QANOON_REWARDS_Contract._isAdmin(adminAdd);
    console.log("rewards admin", admin);
    if (admin == true) {
      let sendUserSupply = await QANOON_REWARDS_Contract.mintAdmin(
        userAdd,
        userAmount
      );
      // res.status
      res.status(200).json({
        success: true,
        message: "you are an admin",
        data: sendUserSupply,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "you are not an admin",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  console.log("Express server listening on port %d in %s mode");
});
