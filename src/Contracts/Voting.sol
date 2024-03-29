// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Voting {
    struct Voter{
        bool voted;
        bool vote;
    }
    struct Proposal {
        address target;
        bytes data;
        uint yesCount;
        uint noCount;
        mapping(address=>Voter) voters;
    }
    
    Proposal[] public proposals;
    mapping(address=>bool) validAddresses;
    event ProposalCreated(uint propID);
    event VoteCast(uint propID, address votersAddress);

    modifier isValidAddress(){
        if(!validAddresses[msg.sender]){
            revert("Not valid Address");
        }
        _;
    }

    constructor(address[] memory addressList){
        for(uint i; i<addressList.length; i++){
            validAddresses[addressList[i]] = true;
        }
        validAddresses[msg.sender] = true;
    }

    function newProposal(address addr, bytes calldata data) external isValidAddress() {
        Proposal storage newProp = proposals.push();
        newProp.target = addr;
        newProp.data = data;
        newProp.yesCount = 0;
        newProp.noCount = 0;
        emit ProposalCreated(proposals.length-1);
    }
    function castVote(uint id, bool vote) external isValidAddress(){
        if(proposals[id].yesCount == 10){
            revert("Already executed");
        }
        if(hasVote(id, msg.sender)){
            if(vote != proposals[id].voters[msg.sender].vote){
                if(vote){
                    proposals[id].yesCount += 1;
                    proposals[id].noCount -= 1;
                }else{
                    proposals[id].noCount += 1;
                    proposals[id].yesCount -= 1;
                }
                proposals[id].voters[msg.sender].vote = vote;
            }
        }else{
            if(vote){
                proposals[id].yesCount += 1;
            }else{
                proposals[id].noCount += 1;
            }
            proposals[id].voters[msg.sender]=Voter(true, vote);
        }
        emit VoteCast(id, msg.sender);
        if(proposals[id].yesCount == 10){
            (bool success, bytes memory result) = proposals[id].target.call(proposals[id].data);
        }

    }
    function hasVote(uint id, address addr) private returns(bool){
        if(proposals[id].voters[addr].voted){
            return true;
        }else{
            return false;
        }
    }
}

