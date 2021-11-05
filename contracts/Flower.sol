pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// Reference contract line 1301 
// https://etherscan.io/address/0xa4631a191044096834ce65d1ee86b16b171d8080#code
contract Flower is ERC721Enumerable {
    string public baseURI;

    address BuildABetterFutureContract = 0xA509542aDa3196a38bD6fD03b253547EE09220C4;
    address TimePieceCommunityContract = 0xABa7902442c5739c6f0c182691d48D63d06A212E;

    // build a better future contract address
        // local contract address: 0xA509542aDa3196a38bD6fD03b253547EE09220C4
        // LocalAccount1 = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;
        // RinkebyAccount1 : 0x3edC82136fEd906A45e0755EA8a0F36bcA0432B3
        // TokenID : https://opensea.io/assets/0xdd69da9a83cedc730bc4d3c56e96d29acc05ecde/4211

    // time piece community contract address
        // contract address: 0xABa7902442c5739c6f0c182691d48D63d06A212E
        // LocalAccount2 = 0xf17f52151EbEF6C7334FAD080c5704D77216b732;
        // RinkebyAccount2 : 0x98D32140D8E25E229e2C29354f30c1577F92348e
        // TokenID : https://opensea.io/assets/0x9307edc4f23d87f9783a999f870b728ab9d34fe5/4251

    // non-collector address empty map
    address[] nonCollectors = [ 0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef ];

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
    // open edition collector = holderOfTimePieceCommunity or holderOfBuildABetterFuture
    function isOpenEditionCollector(address _wallet) public view returns (bool isHolder) {
        ERC721Enumerable buildABetterFuture = ERC721Enumerable(BuildABetterFutureContract);
        ERC721Enumerable timePieceCommunity = ERC721Enumerable(TimePieceCommunityContract);

        isHolder = buildABetterFuture.balanceOf(_wallet) > 0 || timePieceCommunity.balanceOf(_wallet) > 0;
        return isHolder;
    }

    // function to allow is1Of1Holder mint


    // function to non-collector mint



    // function to allow open-edition collector mint




    // function to bulk add non-collector addresses to a map - hmm, this will cost gas to do
    // function to add single non-collector address to a map - hmm, this will cost gass to do



    // function to remove non-collector address from a map


    // function to setMint to be opened


}
