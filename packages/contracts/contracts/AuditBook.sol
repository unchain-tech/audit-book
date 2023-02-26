// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {IERC20, SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AuditBook is ERC721, Ownable {
    using Counters for Counters.Counter;
    using SafeERC20 for IERC20;

    Counters.Counter private _tokenIdCounter;

    // 0x4491D1c47bBdE6746F878400090ba6935A91Dab6
    address public chai;

    uint public price;

    string public tokenUriJson;

    constructor(address chai_,uint price_,string memory tokenUriJson_) ERC721("AuditBook", "AB") {
        chai = chai_;
        price = price_;
        tokenUriJson = tokenUriJson_;
    }

    function safeMint(address to) external {
        if (balanceOf(to) > 0) revert("Already has an AuditBook");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        IERC20(chai).safeTransferFrom(msg.sender, address(this), price);
    }

    function tokenURI(uint tokenId) public view virtual override returns (string memory) {
        return tokenUriJson;
    }

    function setTokenURI(string calldata tokenUriJson_) external onlyOwner {
        tokenUriJson = tokenUriJson_;
    }

    function setPrice(uint price_) external onlyOwner {
        price = price_;
    }

    function withdraw() external onlyOwner {
        IERC20(chai).safeTransfer(msg.sender, IERC20(chai).balanceOf(address(this)));
    }
}
