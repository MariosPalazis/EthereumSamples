const SHA256 = require('crypto-js/sha256');

class Blockchain {
    constructor() {
        this.chain = [new Block(0)];
    }

    addBlock(newBlock) {
        const previousBlock = this.chain[this.chain.length - 1];
        const previousHash = previousBlock.toHash();
        newBlock.setPreviousHash(previousHash);
        // Add the new block to the chain
        this.chain.push(newBlock);
    }
    isValid(block){
        for(let i=1; i<this.chain.length; i++){
            if(this.chain[i-1].toHash().toString()!=this.chain[i].previousHash.toString()){
                return false;
            }
        }
        return true;
    }
}

class Block {
    constructor(data) {
        this.data = data;
    }
    setPreviousHash(prevHash){
        this.previousHash = prevHash;
    }

    toHash() {
        // Include the previousHash property in the hash calculation
        return SHA256(this.previousHash + this.data);
    }
}

module.exports = Blockchain;