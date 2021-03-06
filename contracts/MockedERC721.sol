// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract MockedERC721 is ERC721, Ownable {
    constructor() ERC721("MockedERC721", "MockedERC721") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);

        //const safeHeavenTokens = [4216, 4209, 4213, 4215, 4207, 4214, 4211, 4208, 4210, 4212, 4206];

        
    }
}
