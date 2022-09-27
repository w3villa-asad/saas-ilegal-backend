const ethers = require("ethers");

const {
    QANOON_TOKEN_ABI,
} = require("./abi");

const contracts = require("../config/index");
const private_key = require("./details");
// console.log(private_key.privateKey)
let privateKey = private_key.privateKey;

const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/rP1ruMXTsu52w677aIgYnn5uPSv7VY6N");
let wallet = new ethers.Wallet(privateKey); //can you provide with your add private key , ans : yes i provided mine, only.ok
let walletSigner = wallet.connect(provider);


// const contract = new ethers.Contract(contract.QANOON_TOKEN_ADDRESS

let QANOON_Contract = new ethers.Contract(
    contracts.contracts.QANOON_TOKEN_ADD,
    QANOON_TOKEN_ABI,
    walletSigner
);

console.log(walletSigner),

module.exports = {
    QANOON_Contract
}
