"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LastScannedBlockSchema = new Schema(
  {
    block_number: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const WalletTransactionSchema = new Schema(
  {
    transaction_type: {
      type: String,
      enum: ["debit", "credit", "eth_transfer", "approval", "swap"],
      required: true,
    },
    amount: { type: String, required: true },
    user_id: { type: String, required: true },
    currency: { type: String, required: true, enum: ["ETH", "QAN", "FIAT"] },
    mint_order_id: { type: String, required: true, index: { unique: true } },
    transaction_status: {
      type: String,
      enum: ["pending", "in-progress", "complete", "fail"],
      required: true,
    },
    is_used: { type: String },
    transaction_hash: { type: String, index: { unique: true } },
    parent_id: { type: String },
    retry_count: { type: String },
  },
  { timestamps: true }
);

const MintOrdersSchema = new Schema(
  {
    payment_method: {
      type: String,
      enum: ["ethereum", "qanoon", "credit_card"],
      required: true,
    },
    mint_status: {
      type: String,
      default: "pending",
      enum: ["pending", "inprogress", "ready", "complete"],
      required: true,
    },
    payment_amount: {
      type: String,
      required: true,
    },
    nft_token_id: {
      type: String,
      required: true,
    },
    transaction_hash: {
      type: String,
    },
    retry_count: {
      type: String,
    },
  },

  { timestamps: true }
);

const ItemSaleSchema = new Schema(
  {
    payment_method: {
      type: String,
      enum: ["ethereum", "qanoon", "credit_card"],
      required: true,
    },
    sale_status: {
      type: String,
      default: "pending",
      enum: ["pending", "complete"],
      required: true,
    },
    saleId:{
      type: String,
      index: true,
      required: true,
    },
    payment_amount: {
      type: String,
      required: true,
    },
    art_uri: {
      type: String,
      required: true,
    },
    Owner_id: {
      type: String,
      index: true,
      required: true,
    },
    sale_transaction_hash: {
      type: String,
    },
    buy_transaction_hash: {
      type: String,
    },
    buyer_id: {
      type: String,
      index: true,
    },
    retry_count: {
      type: String,
    },
  },

  { timestamps: true }
);

const NftSaleSchema = new Schema(
  {
    payment_method: {
      type: String,
      enum: ["ethereum", "qanoon", "credit_card"],
      required: true,
    },
    sale_status: {
      type: String,
      default: "pending",
      enum: ["pending", "complete"],
      required: true,
    },
    saleId:{
      type: String,
      index: true,
      required: true,
    },
    payment_amount: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    Owner_id: {
      type: String,
      index: true,
      required: true,
    },
    sale_transaction_hash: {
      type: String,
    },
    buy_transaction_hash: {
      type: String,
    },
    buyer_id: {
      type: String,
      index: true,
    },
    retry_count: {
      type: String,
    },
  },

  { timestamps: true }
);

const NFTTokensSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: { unique: true },
    },
    blockchain_id: {
      type: String,
    },
    asset_info: {
      type: String,
    },
    token_name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserWalletSchema = new Schema(
  {
    User_id: {
      type: String,
      index: { unique: true },
      required: true,
    },
    address: {
      type: String,
      index: { unique: true },
      required: true,
    },
    private_key: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const mintedAuctionSchema = new Schema({
  auctionId: {
    type: String,
    index: { unique: true },
    required: true,
  },
  contractAddress: {
    type: String,
    index: true,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  newOwner: {
    type: String,
  },
  tokenId: {
    type: Number,
    required: true,
    index: true,
  },
  highestBidder: {
    type: String,
  },
  highestBid: {
    type: String,
  },
  setteled: {
    type: Boolean,
    required: true,
  },
  buynowPrice: {
    type: String,
  },
  minPrice: {
    type: String,
  },
  bidIncreaseValue: {
    type: String,
    required: true,
  },
  TokenCurrency: {
    type: String,
    required: true,
  },
  isWhitelistedSale: {
    type: String,
    required: true,
  },
  whitelistedUsers: [{ type: String }],
  expireTime: {
    type: String,
    required: true,
  },
});

const nonMintedAuctionSchema = new Schema({
  auctionId: {
    type: String,
    index: { unique: true },
    required: true,
  },
  contractAddress: {
    type: String,
    index: true,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  newOwner: {
    type: String,
  },
  tokenId: {
    type: String,
    required: true,
  },
  highestBidder: {
    type: String,
  },
  highestBid: {
    type: String,
  },
  setteled: {
    type: Boolean,
    required: true,
  },
  buynowPrice: {
    type: String,
  },
  minPrice: {
    type: String,
  },
  bidIncreaseValue: {
    type: String,
    required: true,
  },
  TokenCurrency: {
    type: String,
    required: true,
  },
  isWhitelistedSale: {
    type: String,
    required: true,
  },
  whitelistedUsers: [{ type: String }],
  expireTime: {
    type: String,
    required: true,
  },
});

const LastScannedBlocks = mongoose.model(
  "LastScannedBlocks",
  LastScannedBlockSchema
);

const WalletTransactions = mongoose.model(
  "WalletTransactions",
  WalletTransactionSchema
);

const MintOrder = mongoose.model("MintOrder", MintOrdersSchema);
const ItemSale = mongoose.model("ItemSale", ItemSaleSchema);
const NftSale = mongoose.model("NFTSale", NftSaleSchema);

const NFTToken = mongoose.model("NFTToken", NFTTokensSchema);

const UserWallet = mongoose.model("usersWallet", UserWalletSchema);

const MintedAuction = mongoose.model(
  "mintedAuctionSchema",
  mintedAuctionSchema
);
const NonMintedAuction = mongoose.model(
  "nonMintedAuctionSchema",
  nonMintedAuctionSchema
);

module.exports = {
  LastScannedBlocks,
  WalletTransactions,
  MintOrder,
  ItemSale,
  NftSale,
  NFTToken,
  UserWallet,
  MintedAuction,
  NonMintedAuction,
};
