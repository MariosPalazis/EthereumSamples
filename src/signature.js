const secp = require("ethereum-cryptography/secp256k1");
import { keccak256 } from "ethereum-cryptography/keccak.js";
const { utf8ToBytes } = require("ethereum-cryptography/utils");

//hash message
function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
}

//sign message
const PRIVATE_KEY = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

async function signMessage(msg) {
    const hashed = hashMessage(msg);
    return secp.sign(hashed, PRIVATE_KEY, { recovered: true });
}

//recover public key
async function recoverKey(message, signature, recoveryBit) {
    const hashed = hashMessage(message);
    return secp.recoverPublicKey(hashed,signature,recoveryBit);
}


// Let's get the ethereum address from the public key....20 last bits of public key!
// First step, you'll need to take the first byte off the public key. The first byte indicates the format of the key, whether it is in the compressed format or not. 
// The publicKey will be a Uint8Array so you can use the slice method to slice off the first byte.
// Next, take the keccak hash of the rest of the public key.
// Finally, take the last 20 bytes of the keccak hash and return this. 
function getAddress(publicKey) {
    const removedbit = publicKey.slice(1, publicKey.length);
    const hashed = keccak256(removedbit);
    return hashed.slice(-20, hashed.length);
}

module.exports = getAddress;
module.exports = hashMessage;
module.exports = recoverKey;
module.exports = signMessage;