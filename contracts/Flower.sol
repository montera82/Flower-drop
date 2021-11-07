pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

// Reference contract line 1301
// https://etherscan.io/address/0xa4631a191044096834ce65d1ee86b16b171d8080#code
contract Flower is ERC721Enumerable {
    string public baseURI;

    address BuildABetterFutureContract =
        0xA509542aDa3196a38bD6fD03b253547EE09220C4;
    address TimePieceCommunityContract =
        0xABa7902442c5739c6f0c182691d48D63d06A212E;

    // build a better future contract address aka (Safe Haven)
    // local contract address: 0xA509542aDa3196a38bD6fD03b253547EE09220C4
    // rinkeby contract address; 0x0b2202132E4C0EA64A2740f1230398262e5567B1
    // LocalAccount1 = 0x627306090abaB3A6e1400e9345bC60c78a8BEf57;
    // RinkebyAccount1 : 0xf795b1d0e21a6488f5f44d9e61d26ae556b97d8b
    // TokenID : https://opensea.io/assets/0xdd69da9a83cedc730bc4d3c56e96d29acc05ecde/4211

    // time piece community contract address aka (Grace 2)
    // contract address: 0xABa7902442c5739c6f0c182691d48D63d06A212E
    // rinkeby contract : 0xEF690F8C6A2D5e660AdAA1A813dba38e45404066
    // LocalAccount2 = 0xf17f52151EbEF6C7334FAD080c5704D77216b732;
    // RinkebyAccount2 : 0x57A37fC8651b972A1b86dF328598d6d9609d6e09
    // TokenID : https://opensea.io/assets/0x9307edc4f23d87f9783a999f870b728ab9d34fe5/4251

    // non-collector address empty map
    mapping(address => bool) nonCollectors;

    constructor(string memory _initBaseURI) ERC721("Flowers", "FLW") {
        setBaseURI(_initBaseURI);

        // define non-collectors
        nonCollectors[0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef] = true;
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
    function isNonCollector(address _wallet) external view returns (bool) {
        return nonCollectors[_wallet];
    }

    // function to determine if sender is open-edition collector
    // open edition collector = holderOfTimePieceCommunity or holderOfBuildABetterFuture
    function isOpenEditionCollector(address _wallet)
        external
        view
        returns (bool isHolder)
    {
        ERC721Enumerable buildABetterFuture = ERC721Enumerable(
            BuildABetterFutureContract
        );
        ERC721Enumerable timePieceCommunity = ERC721Enumerable(
            TimePieceCommunityContract
        );

        isHolder =
            buildABetterFuture.balanceOf(_wallet) > 0 ||
            timePieceCommunity.balanceOf(_wallet) > 0;
        return isHolder;
    }

    // function to allow is1Of1Holder mint

    // function to non-collector mint
    function mintForNonCollector() external pure {}

    // function to allow open-edition collector mint

    // function to bulk add non-collector addresses to a map - hmm, this will cost gas to do
    // function to add single non-collector address to a map - hmm, this will cost gass to do

    // function to remove non-collector address from a map

    // function to setMint to be opened
}
