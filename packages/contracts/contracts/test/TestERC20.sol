// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract TestERC20 is ERC20, Ownable {
    uint256 private _totalSupply;

    constructor(uint256 initialSupply) ERC20('TestERC20', 'TE20') {
        _mint(msg.sender, initialSupply);
    }
}
