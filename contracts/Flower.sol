pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// Reference contract line 1301 
// https://etherscan.io/address/0xa4631a191044096834ce65d1ee86b16b171d8080#code
contract Flower is ERC721Enumerable {
    string public baseURI;

    // build a better future contract address

    // time piece community contract address

    // Rarible contract address

    // non-collector address empty map

    constructor(string memory _initBaseURI) ERC721("Flowers", "FLW") {
        setBaseURI(_initBaseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newURI) public {
        baseURI = newURI;
    }

    // function to determine if sender is is1Of1Holder

        // check that mint is open
        // check that user has not previously minted. require(mintList[_wallet]=false)

    
    
    // function to determine if sender is non-collector hodler


    // function to determine if sender is open-edition collector


    // function to allow is1Of1Holder mint


    // function to non-collector mint



    // function to allow open-edition collector mint




    // function to bulk add non-collector addresses to a map - hmm, this will cost gas to do
    // function to add single non-collector address to a map - hmm, this will cost gass to do



    // function to remove non-collector address from a map


    // function to setMint to be opened


}
