const ethers = require("ethers");

const {
    QANOON_TOKEN_ABI,
    QANOON_DOCUMENT_FACTORY_ABI,
    QANOON_ASASI_ABI,
    QANOON_REWARDS_ABI,
    QANOON_PLUS_ABI,
    QANOON_PREMIUM_ABI,
    QANOON_COMPLEMENTARY_ABI
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

let QANOON_ASASI_Contract = new ethers.Contract(
    contracts.contracts.QANOON_ASASI_ADD,
    QANOON_ASASI_ABI,
    walletSigner
);

let QANOON_REWARDS_Contract = new ethers.Contract(
    contracts.contracts.QANOON_REWARDS_ADD,
    QANOON_REWARDS_ABI,
    walletSigner
);

let QANOON_PLUS_Contract = new ethers.Contract(
    contracts.contracts.QANOON_PLUS_ADD,
    QANOON_PLUS_ABI,
    walletSigner
);

let QANOON_PREMIUM_Contract = new ethers.Contract(
    contracts.contracts.QANOON_PREMIUM_ADD,
    QANOON_PREMIUM_ABI,
    walletSigner
);

let QANOON_COMPLEMENTARY_Contract = new ethers.Contract(
    contracts.contracts.QANOON_COMPLEMENTARY_ADD,
    QANOON_COMPLEMENTARY_ABI,
    walletSigner
);


let QANOON_DOC_Contract = new ethers.Contract(
    contracts.contracts.QANOON_DOCUMENT_FACTORY_ADD,
    QANOON_DOCUMENT_FACTORY_ABI,
    walletSigner
);

// console.log(QANOON_Contract);
// console.log(QANOON_DOC_Contract);

// module.
// console.log(walletSigner)

module.exports = {
    QANOON_Contract,
    QANOON_DOC_Contract,
    QANOON_ASASI_Contract,
    QANOON_REWARDS_Contract,
    QANOON_PLUS_Contract,
    QANOON_PREMIUM_Contract,
    QANOON_COMPLEMENTARY_Contract
}
