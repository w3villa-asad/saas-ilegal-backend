const contracts = require("./provider");
const ethers = require("ethers");
let QANOON_Contract = contracts.QANOON_Contract;
let QANOON_DOC = contracts.QANOON_DOC_Contract;

// let contract = new QANOON_Contract() contracts();
const MintQAN = async (req,res) => {
  try{
    // console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    // console.log("new account",typeof recieverAccount, typeof recieverAmount);
    // console.log("amount", req.body);
    
    let tx = await QANOON_Contract.mint(recieverAccount,recieverAmount);
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
    
};


const createTransfer = async (req, res) => {
    try {
        let { recieverAccount, recieverAmount } = req.body;

        console.log("transfer amount", req.body);
        
        let confirmedTransaction = await QANOON_Contract.transfer(recieverAccount, recieverAmount);
        res.status(200).json({
          succes: true,
          message: recieverAmount + " Qanoon is transfered  to " + recieverAccount,
          data: confirmedTransaction,
        });
      } catch (error) {
        throw new Error(error);
      }
    };

 let mintQANN = async (recieverAccount,recieverAmount) => {
        //  let {
        //     signedNFTContract,
        //     signedSwapperContract,
        //     signedItemContract,
        //     signedAuctionContract,
        // }
        // let contractsWithSigner = signedContracts();
        
        console.log(">>>>>>>>>>>>>>>>>>>",recieverAmount);
        console.log("<<<<<<<<<<<<<<<<<<<",recieverAccount);
        // console.log(">>>>>>>>>>>>>>>>>>>",ethers.utils.parseUnits(recieverAmount, 18));
        // let estimateGas = await contracts.QANOON_Contract.estimateGas.mint(recieverAccount,ethers.utils.parseUnits(recieverAmount, 18));
        // console.log("GasEstimate",estimateGas.toString());
        let tx = await contracts.QANOON_Contract.mint(recieverAccount,ethers.utils.parseUnits(recieverAmount, 18));
        // let confirmed_tx = await tx.wait();
        // console.log(confirmed_tx);
        return tx;
        }

  let mintASASI = async (req, res) => {
    try {
      // console.log("amount", req.body);
      let { recieverAccount, recieverAmount } = req.body;
      // console.log("new account", typeof recieverAccount, typeof recieverAmount);
      // console.log("amount", req.body);
      
      let tx = await contracts.QANOON_ASASI_Contract.mint(recieverAccount, ethers.utils.parseUnits(recieverAmount.toString(), 18));
      tx.wait();
      await tx.wait();
      // console.log("txn",tx);
      //
      res.status(200).json({
        success: true,
        message: recieverAmount + " Qanoon Asasi Tokens minted to " + recieverAccount,
        data: tx,
      });
      return tx;
    } catch (error) {
      throw new Error(error);
    }
  };
        

const documentCreate = async (req, res) => {
    try {
        let { docOwnerAddress, docType, docURI, docParams } = req.body;

        // documentCreate
        console.log("docOwnerAdd",docOwnerAddress);
        console.log("document create", req.body);

        let txn = await QANOON_DOC.create(docOwnerAddress, docType, docURI, docParams);
        console.log("Transaction", txn);
        res.status(200).json({
            success: true,
            message: "document created successfully!!",
            data: txn,
        });

    } catch (error) {
        throw new Error(error);
    }
};

let mintREWARDS = async (req, res) => {
  try {
    console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    console.log("new account", typeof recieverAccount, typeof recieverAmount);
    console.log("amount", req.body);
    
    let tx = await contracts.QANOON_REWARDS_Contract.mint(recieverAccount, ethers.utils.parseUnits(recieverAmount.toString(), 18));
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message: recieverAmount + " Qanoon Rewards Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
};

let mintPLUS = async (req, res) => {
  try {
    // console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    // console.log("new account", typeof recieverAccount, typeof recieverAmount);
    // console.log("amount", req.body);
    
    let tx = await contracts.QANOON_PLUS_Contract.buy(recieverAccount, ethers.utils.parseUnits(recieverAmount.toString(), 18));
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message: recieverAmount + " Qanoon Plus Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
};

let mintPREMIUM = async (req, res) => {
  try {
    // console.log("amount", req.body);
    let { recieverAccount, time, uid, recieverAmount } = req.body;
    // console.log("new account", typeof recieverAccount, typeof recieverAmount);
    // console.log("amount", req.body);
    
    let tx = await contracts.QANOON_PREMIUM_Contract.stake(time, uid, ethers.utils.parseUnits(recieverAmount.toString(), 18));
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message: recieverAmount + " Qanoon Premium Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
};

let mintCOMPLEMENTARY = async (req, res) => {
  try {
    // console.log("amount", req.body);
    let { recieverAccount, recieverAmount } = req.body;
    // console.log("new account", typeof recieverAccount, typeof recieverAmount);
    // console.log("amount", req.body);

    recieverAmount = recieverAmount;
    console.log("recieverAmount", recieverAmount);
    
    let tx = await contracts.QANOON_COMPLEMENTARY_Contract.mint(recieverAccount, ethers.utils.parseUnits(recieverAmount.toString(), 18));
    //  tx.wait();
    await tx.wait();
    // console.log("txn",tx);
    //
    res.status(200).json({
      success: true,
      message: recieverAmount + " Qanoon Complementary Tokens minted to " + recieverAccount,
      data: tx,
    });
    return tx;
  } catch (error) {
    throw new Error(error);
  }
};

let addQanPlusInvestors = async (req, res)=>{
  try{
    let { ownerAdd, userAdd } = req.body;
    console.log("plus investors request body", req.body);
    let ownerAddress = await contracts.QANOON_PLUS_Contract.owner();
    console.log("plus investor owner", ownerAddress , ownerAdd);
    if (ownerAdd == ownerAddress)
    {
      let addInvest = await contracts.QANOON_PLUS_Contract.addInvestor(userAdd);
      console.log("plus investors add", addInvest);
      await addInvest.wait();
      // let giveInvestorSupply = await QANOON_PLUS_Contract.issueInvestorSupply(userAdd, ethers.utils.formatUnits(userAmount, 18));
      // await giveInvestorSupply.wait();
      res.status(200).json({
        success: true,
        message: userAdd + "added as investor" ,
        data: addInvest,
      })
    }
    else{
      err = "owner can only add Investors";
      return err;
    }

  } catch (error){
    throw new Error(error);
  }
};

let giveSupplyToInvestor = async (req, res)=> {
  try{
    let {userAdd, userAmount} = req.body;
    let owner = await contracts.QANOON_PLUS_Contract._isInvestor(userAdd);
    console.log("plus owner", owner);
    if (owner == true){
      let sendInvestorSupply = await contracts.QANOON_PLUS_Contract.issueInvestorSupply(userAdd, userAmount);
      // res.status
      res.status(200).json({
        success: true,
        message: "you are an investor",
        data: sendInvestorSupply
      });
    }
    else {
      res.status(404).json({
        success: true,
        message: "you are not an investor"
      });

    }
  } catch (error){
    throw new Error(error);
  }
}
    

module.exports = {
    MintQAN,
    createTransfer,
    mintQANN,
    documentCreate,
    mintASASI,
    mintREWARDS,
    mintPLUS,
    mintPREMIUM,
    mintCOMPLEMENTARY,
    addQanPlusInvestors,
    giveSupplyToInvestor

}