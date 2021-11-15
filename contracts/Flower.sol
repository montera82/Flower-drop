pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

// Reference contract line 1301
// https://etherscan.io/address/0xa4631a191044096834ce65d1ee86b16b171d8080#code
contract Flower is ERC721Enumerable, Ownable {
    string public baseURI;

    // 1 of 1 collectors
    // local account 3: 0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef

    // non collectors
    // local account 4: 0x821aEa9a577a9b44299B9c15c88cf3087F3b5544

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

    // Contract or mappings reference
    mapping(address => bool) oneOfOneCollectors;

    mapping(address => bool) nonCollectors;

    address BuildABetterFutureContract;
    address TimePieceCommunityContract;

    // mintList
    mapping(address => bool) public oneOfOneMintList;
    mapping(address => bool) public nonCollectorsMintList;
    mapping(address => bool) public openEditionCollectorsMintList;

    // counters
    // tokenIds 1 to 14
    uint256 private oneOfOneMintedCount = 1;

    // tokenIds 15 to 24
    uint256 private nonCollectorsMintedCount = 15;

    // tokenIds 25 to ..
    uint256 public openEditionCollectorsMintedCount = 25;

    bool private mintOpen = true;

    modifier whenMintOpened() {
        require(mintOpen == true, "Mint is not yet open");
        _;
    }

    constructor(
        string memory _initBaseURI,
        address buildABetterFutureContract,
        address timePieceCommunityContract
    ) ERC721("Flowers", "FLW") {
        setBaseURI(_initBaseURI);

        BuildABetterFutureContract = buildABetterFutureContract;
        TimePieceCommunityContract = timePieceCommunityContract;

        // define one-of-one-collectors
        // TOdo: fill here with the address from the sheet
        oneOfOneCollectors[0x53C379A44018504059D01Ee3eB9645Cb115fD932] = true;

        // define non-collectors
        nonCollectors[0x821aEa9a577a9b44299B9c15c88cf3087F3b5544] = true;
        nonCollectors[0x53C379A44018504059D01Ee3eB9645Cb115fD932] = true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function setMintOpen(bool value) external onlyOwner {
        require(mintOpen != value, "mintOpen already this value");
        mintOpen = value;
    }

    // function to determine if sender is is1Of1Holder
    function isOneOfOneCollector(address _wallet) public view returns (bool) {
        return oneOfOneCollectors[_wallet];
    }

    // function to determine if sender is non-collector hodler
    function isNonCollector(address _wallet) public view returns (bool) {
        return nonCollectors[_wallet];
    }

    // function to determine if sender is open-edition collector
    // open edition collector = holderOfTimePieceCommunity or holderOfBuildABetterFuture
    function isOpenEditionCollector(address _wallet)
        public
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

    // function to allow 1 of 1 holder collector mint
    function mint1Of1Holder(address _wallet) external whenMintOpened {
        require(
            oneOfOneMintList[_wallet] == false,
            "Wallet already minted before for this category"
        );
        require(
            isOneOfOneCollector(_wallet) == true,
            "Wallet must be an open edition collector"
        );
        // this condition should actually never be triggered, but having it here incase
        // might remove later to save compiled code space.
        require(
            oneOfOneMintedCount <= 14,
            "INTERNAL ERROR: Reached max tokens allowed for this category"
        );

        uint256 tokenId = oneOfOneMintedCount;
        _safeMint(_wallet, tokenId);

        oneOfOneMintList[_wallet] = true;
        oneOfOneMintedCount += 1;

        emit LogMintOneOfOneHolder(_wallet, tokenId);
    }

    // function to allow non-collector mint
    function mintNonCollector(address _wallet) external whenMintOpened {
        require(
            nonCollectorsMintList[_wallet] == false,
            "Wallet already minted before for this category"
        );
        require(
            isNonCollector(_wallet) == true,
            "Wallet must be part of the non-collector list"
        );

        // this condition should actually never be triggered, but having it here incase
        // might remove later to save compiled code space.
        require(
            nonCollectorsMintedCount <= 24,
            "INTERNAL ERROR: Reached max tokens allowed for this category"
        );

        uint256 tokenId = nonCollectorsMintedCount;
        _safeMint(_wallet, tokenId);

        nonCollectorsMintList[_wallet] = true;
        nonCollectorsMintedCount += 1;

        emit LogMintNonCollector(_wallet,  tokenId);
    }

    // function to allow open-edition collector mint
    function mintOpenEdition(address _wallet) external whenMintOpened {
        require(
            openEditionCollectorsMintList[_wallet] == false,
            "Wallet already minted before for this category"
        );
        require(
            isOpenEditionCollector(_wallet) == true,
            "Wallet must be an open edition collector"
        );

        // ToDO : add hard limit for total supply
        // Todod: store a mapping ( openEditionTOkenId => bool )
        
        uint256 tokenId = openEditionCollectorsMintedCount;
        _safeMint(_wallet, tokenId);

        openEditionCollectorsMintList[_wallet] = true;
        openEditionCollectorsMintedCount += 1;

        emit LogMintOpenEdition(_wallet,  tokenId);
    }

    // function to bulk add non-collector addresses to a map - hmm, this will cost gas to do
    // function to add single non-collector address to a map - hmm, this will cost gass to do

    // function to remove non-collector address from a map

    // Events
    event LogMintOneOfOneHolder(address indexed _address, uint256 _tokenId);
    event LogMintNonCollector(address indexed _address, uint256 _tokenId);
    event LogMintOpenEdition(address indexed _address, uint256 _tokenId);
}
