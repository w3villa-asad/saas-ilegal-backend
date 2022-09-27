const ethers = require("ethers");
const Contracts =require("../defaultProvider");

const {
  QANOON_TOKEN_CONTRACT,
} = Contracts();

let provider = new ethers.providers.JsonRpcProvider("https://eth-ropsten.alchemyapi.io/v2/ZuEYyKLqeVaumEL4MGRaYfBrFVVLNcAB");

 const getBalanceOfUser = async (userAdd) => {
  let userbalance = await QANOON_TOKEN_CONTRACT.balanceOf(userAdd);
    return(ethers.utils.formatUnits(userbalance,18));
};

 const getEthBalanceOfUser = async (userAdd) => {
  let balance = await provider.getBalance(userAdd);
  return ethers.utils.formatEther(balance);
};

module.exports = {
  getBalanceOfUser,
  getEthBalanceOfUser
}


