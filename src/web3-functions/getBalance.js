const ethers = require("ethers");
const Contracts =require("../contracts/provider");

const QANOON_TOKEN_CONTRACT = Contracts.QANOON_Contract;

let provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/rP1ruMXTsu52w677aIgYnn5uPSv7VY6N");

 const getBalanceOfUser = async (req, res) => {
  try{
    let { userAdd } = req.body;
    console.log(userAdd,"userAddress");
  // userAdd = req.body;
  console.log(req.body, "user Add");
  let userbalance = await QANOON_TOKEN_CONTRACT.balanceOf(userAdd);
  let userbal = await ethers.utils.formatUnits(userbalance,18);
  console.log(userbalance , "userbalance", userbal,"user bal");
  res.status(200).json({
    succes: true,
    message: userAdd + "Balance of user",
    data: userbal,
  });
    return(ethers.utils.formatUnits(userbalance,18));
    // return(userbalance);

  } catch (error) {
    throw new Error(error);
  }
};

 const getEthBalanceOfUser = async (userAdd) => {
  let balance = await provider.getBalance(userAdd);
  return ethers.utils.formatEther(balance);
};

module.exports = {
  getBalanceOfUser,
  getEthBalanceOfUser
}


