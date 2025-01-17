const ethers = require('ethers');

function deploy(abi, bytecode, signer, arbiterAddress, beneficiaryAddress) {
    const factory = new ethers.ContractFactory(abi, bytecode, signer);
    return factory.deploy(arbiterAddress, beneficiaryAddress, {
        value: ethers.utils.parseEther("1")
    });
}

function approve(contract, arbiterSigner) {
    return contract.connect(arbiterSigner).approve()
}

module.exports = approve;
module.exports = deploy;