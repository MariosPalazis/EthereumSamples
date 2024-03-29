const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    // TODO: add transaction to mempool
    mempool.push(transaction);
}

function mine() {
    // TODO: mine a block
    let count = 0;
    let transactionsToBeMined = [];
    while(count<MAX_TRANSACTIONS){
        if(mempool.length>0){
            transactionsToBeMined.push(mempool.pop());
        }else{
            break;
        }
        count++;
    }
    const blockString = JSON.stringify({id: blocks.length});
    const hashed = SHA256(blockString);
    const block = {
        id: blocks.length,
        nonce: 0, // Add nonce property starting at 0
        transactions: transactionsToBeMined
    };
    while (true) {
        const blockString = JSON.stringify(block);
        const hashed = SHA256(blockString);

        // Check if the hash satisfies the target difficulty
        if (BigInt('0x' + hashed.toString()) < TARGET_DIFFICULTY) {
            //block.hash = hashed;
            blocks.push({nonce: block.nonce, hash: hashed, transactions: transactionsToBeMined});

            break;
        }

        // Increment the nonce and try again
        block.nonce++;
    }
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};