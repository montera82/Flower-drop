pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Flower is ERC721Enumerable {
    string public baseURI;

    constructor(string memory _initBaseURI) ERC721("Flowers", "FLW") {
        setBaseURI(_initBaseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newURI) public {
        baseURI = newURI;
    }
}
