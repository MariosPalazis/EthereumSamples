const { Wallet, utils, providers } = require('ethers');
const { ganacheProvider } = require('./config');


// create a wallet with a private key
const wallet1 = new Wallet("0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d");//private key

// create a wallet from mnemonic
const wallet2 = Wallet.fromMnemonic("plate lawn minor crouch bubble evidence palace fringe bamboo laptop dutch ice" );//mnemonic


//Signing Transactions
const signaturePromise = wallet1.signTransaction({
    value: utils.parseUnits('1', 'ether'),
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92", 
    gasLimit: 0x5208,//21000
});

//with provider send to ganache network
const provider = new providers.Web3Provider(ganacheProvider);; 
async function sendEther({ value, to }) {
    const rawTx = await wallet1.signTransaction({ 
        value, to, 
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00 
    });

    //send the transaction and return the transaction promise
    return (await provider.sendTransaction(rawTx) )
}

//CORRECT WAY Fast send transaction with sendTransaction
//autoadds nonce etc..
const wallet = new Wallet(process.evm.PRIVATE_KEY,provider);

async function sendEther({ value, to }) {
    return await wallet.sendTransaction({ 
        value, to, 
        gasLimit: 0x5208,
        gasPrice: 0x3b9aca00 
    });
}
//get wallet balance
function findMyBalance(privateKey) {
    // retrieve the balance, given a private key
    const wallet = new Wallet(privateKey, provider);
    return wallet.getBalance();
}

module.exports = {
    wallet1,
    wallet2,
    signaturePromise
}