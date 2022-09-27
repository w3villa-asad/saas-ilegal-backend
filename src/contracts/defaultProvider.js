// const {
//   QANOON_TOKEN_ABI,
//   QANOON_NFT_TOKEN_ABI,
//   QANOON_SWAPPER_ABI,
//   QANOON_NFT_AUCTION_ABI,
//   QANOON_ITEM_AUCTION_ABI,
//   QANOON_DIRECT_ITEM_SALE_ABI,
//   QANOON_DIRECT_NFT_SALE_ABI
// } = require("./abi");
// // const { contracts } = require("../config/index");
// const { ethers } = require("ethers");

// // console.log(contracts);

// export function Contracts() {
//   const provider = new ethers.providers.JsonRpcProvider(
//     "https://eth-ropsten.alchemyapi.io/v2/ZuEYyKLqeVaumEL4MGRaYfBrFVVLNcAB"
//   );
//   // const signer = provider.getSigner();

//   const QANOON_NFT_TOKEN_ADD = contracts.QANOON_NFT_TOKEN_ADD;
//   const QANOON_TOKEN_ADD = contracts.QANOON_TOKEN_ADD;
//   const QANOON_SWAPPER_ADD = contracts.QANOON_SWAPPER_ADD;
//   const QANOON_NFT_AUCTION_ADD = contracts.QANOON_NFT_AUCTION_ADD;
//   const QANOON_ITEM_AUCTION_ADD = contracts.QANOON_ITEM_AUCTION_ADD;
//   const QANOON_DIRECT_ITEM_SALE_ADD = contracts.QANOON_DIRECT_ITEM_SALE_ADD;
//   const QANOON_DIRECT_NFT_SALE_ADD = contracts.QANOON_DIRECT_NFT_SALE_ADD;

//   const QANOON_NFT_TOKEN_CONTRACT = new ethers.Contract(
//     QANOON_NFT_TOKEN_ADD,
//     QANOON_NFT_TOKEN_ABI,
//     provider
//   );

//   const QANOON_TOKEN_CONTRACT = new ethers.Contract(
//     QANOON_TOKEN_ADD,
//     QANOON_TOKEN_ABI,
//     provider
//   );

//   const QANOON_SWAPPER_CONTRACT = new ethers.Contract(
//     QANOON_SWAPPER_ADD,
//     QANOON_SWAPPER_ABI,
//     provider
//   );

//   const QANOON_NFT_AUCTION_CONTRACT = new ethers.Contract(
//     QANOON_NFT_AUCTION_ADD,
//     QANOON_NFT_AUCTION_ABI,
//     provider
//   );
//   const QANOON_ITEM_AUCTION_CONTRACT = new ethers.Contract(
//     QANOON_ITEM_AUCTION_ADD,
//     QANOON_ITEM_AUCTION_ABI,
//     provider
//   );
//   const QANOON_DIRECT_ITEM_SALE_CONTRACT = new ethers.Contract(
//     QANOON_DIRECT_ITEM_SALE_ADD,
//     QANOON_DIRECT_ITEM_SALE_ABI,
//     provider
//   );
//   const QANOON_DIRECT_NFT_SALE_CONTRACT = new ethers.Contract(
//     QANOON_DIRECT_NFT_SALE_ADD,
//     QANOON_DIRECT_NFT_SALE_ABI,
//     provider
//   );
//   // const getprovider=()=>{
//   //   return provider
//   // }
//   return {
//     QANOON_NFT_TOKEN_CONTRACT: QANOON_NFT_TOKEN_CONTRACT,
//     QANOON_TOKEN_CONTRACT: QANOON_TOKEN_CONTRACT,
//     QANOON_SWAPPER_CONTRACT: QANOON_SWAPPER_CONTRACT,
//     QANOON_NFT_AUCTION_CONTRACT: QANOON_NFT_AUCTION_CONTRACT,
//     QANOON_ITEM_AUCTION_CONTRACT: QANOON_ITEM_AUCTION_CONTRACT,
//     QANOON_DIRECT_ITEM_SALE_CONTRACT: QANOON_DIRECT_ITEM_SALE_CONTRACT,
//     QANOON_DIRECT_NFT_SALE_CONTRACT: QANOON_DIRECT_NFT_SALE_CONTRACT,
//   };
// }
// // export default Contracts;
