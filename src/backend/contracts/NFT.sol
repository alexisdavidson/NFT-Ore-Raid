// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract NFT is Ownable, ERC721Burnable {
    string public uriPrefix = '';
    string public uriSuffix = '.json';
    uint256 public max_supply = 5000;
    uint256 public amountMintPerAccount = 1;
    uint256 public currentToken = 0;

    event MintSuccessful(address user);

    constructor(address _teamWallet) ERC721("FREAKY RABBIT", "FR")
    { 
        transferOwnership(_teamWallet);
    }

    function mint() external {
        require(balanceOf(msg.sender) < amountMintPerAccount, 'Each address may only mint x NFTs!');
        require(currentToken < max_supply, 'No more NFT available to mint!');

        currentToken += 1;
        _safeMint(msg.sender, currentToken);
        
        emit MintSuccessful(msg.sender);
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), 'ERC721Metadata: URI query for nonexistent token');
        return _baseURI();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmT9np4jHGp5MUwEHWFUVAe9xB8yDxCS2EsCZqrczYXbux/";
    }
    
    function baseTokenURI() public pure returns (string memory) {
        return _baseURI();
    }

    function contractURI() public pure returns (string memory) {
        return "ipfs://QmdmSPaNFaBzVR3GSFDfmP7DG9JdahnDu1P94L5H44Y5DR/";
    }

    function setAmountMintPerAccount(uint _amountMintPerAccount) public onlyOwner {
        amountMintPerAccount = _amountMintPerAccount;
    }
    
    function withdraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
