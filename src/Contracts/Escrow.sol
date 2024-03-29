// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Escrow {
    address public depositor;
    address public beneficiary;
    address public arbiter;
    bool public isApproved = false;

    event Approved(uint balance);

    modifier onlyArbiter{
        if(msg.sender != arbiter){
            revert("Only Arbiter");
        }
        _;
    }
    
    constructor(address _arbiter, address _beneficiary) payable{
        depositor = msg.sender;
        arbiter = _arbiter;
        beneficiary = _beneficiary;
    }

    function approve() external onlyArbiter{
        uint balance = address(this).balance;
        (bool s, ) = beneficiary.call{ value: address(this).balance }("");
        require(s, "Failed to send ether");
        isApproved = true; 
        emit Approved(balance);
    }
}

    