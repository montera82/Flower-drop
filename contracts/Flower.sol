// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

// Reference contract line 1301
// https://etherscan.io/address/0xa4631a191044096834ce65d1ee86b16b171d8080#code
contract Flower is ERC721Enumerable, Ownable {
    string public baseURI;

    // Contract or mappings reference
    mapping(address => bool) oneOfOneCollectors;

    mapping(address => bool) nonCollectors;

    address BuildABetterFutureContract;
    address TimePieceCommunityContract;

    // mintList
    mapping(address => bool) public oneOfOneMintList;
    mapping(address => bool) public nonCollectorsMintList;
    // tokenId => minted
    mapping(uint256 => bool) safeHavenTokenMintList;
    mapping(uint256 => bool) graceIITokenMintList;

    // counters
    // tokenIds 1 to 14
    uint256 private oneOfOneMintedCount = 1;

    // tokenIds 15 to 24
    uint256 private nonCollectorsMintedCount = 15;

    // tokenIds 25 to 54
    uint256 public openEditionCollectorsMintedCount = 25;

    bool private mintOpen = false;

    //these tokens must exists, otherwise the check fails cos of _exists
    uint256[] safeHavenTokens = [1]; //babF
    uint256[] graceIITokens = [2]; // IRB

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
        //oneOfOneCollectors[0x53C379A44018504059D01Ee3eB9645Cb115fD932] = true;

        // define non-collectors
        nonCollectors[0x53C379A44018504059D01Ee3eB9645Cb115fD932] = true;
        nonCollectors[0xF795b1d0E21A6488f5F44d9e61D26aE556b97D8b] = true;

        // _safeMint(_msgSender(),1);
        // _safeMint(_msgSender(),2);
        // _safeMint(_msgSender(),3);
        // _safeMint(_msgSender(),4);
        // _safeMint(_msgSender(),5);
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

    function _safeHavenOwner(address _wallet)
        internal
        view
        returns (bool _holder, uint256 _tokenId)
    {
        ERC721 buildABetterFuture = ERC721(BuildABetterFutureContract);

        for (uint256 i = 0; i < safeHavenTokens.length; i++) {
            if (buildABetterFuture.ownerOf(safeHavenTokens[i]) == _wallet) {
                return (true, safeHavenTokens[i]);
            }
        }
        return (false, 0);
    }

    function _graceIIOwner(address _wallet)
        internal
        view
        returns (bool _holder, uint256 _tokenId)
    {
        ERC721 timePieceCommunity = ERC721(TimePieceCommunityContract);

        for (uint256 i = 0; i < graceIITokens.length; i++) {
            if (timePieceCommunity.ownerOf(graceIITokens[i]) == _wallet) {
                return (true, graceIITokens[i]);
            }
        }
        return (false, 0);
    }

    // function to determine if sender is open-edition collector
    // open edition collector = holderOfTimePieceCommunity or holderOfBuildABetterFuture
    function isOpenEditionCollector(address _wallet)
        public
        view
        returns (
            bool isHolder,
            uint256 safeHavenTokenId,
            uint256 graceIITokenId
        )
    {
        (bool _safeHavenHolder, uint256 _safeHavenTokenId) = _safeHavenOwner(
            _wallet
        );
        (bool _graceIIHolder, uint256 _graceIITokenId) = _graceIIOwner(_wallet);

        isHolder = _safeHavenHolder == true || _graceIIHolder == true;
        return (isHolder, _safeHavenTokenId, _graceIITokenId);
    }

    // function to allow 1 of 1 holder collector mint
    function mint1Of1Holder(address _wallet) external whenMintOpened {
        require(
            oneOfOneMintList[_wallet],
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
            nonCollectorsMintList[_wallet],
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
        emit LogMintNonCollector(_wallet, tokenId);
    }

    // function to allow open-edition collector mint
    function mintOpenEdition(address _wallet) external whenMintOpened {
        (
            bool isHolder,
            uint256 _safeHavenTokenId,
            uint256 _graceIITokenId
        ) = isOpenEditionCollector(_wallet);
        require(
            isHolder == true,
            "Must be a holder of GraceII or SafeHaven"
        );
        require(
            safeHavenTokenMintList[_safeHavenTokenId] == false ||
                graceIITokenMintList[_graceIITokenId] == false,
            "Wallet minted already before for this category"
        );

        // Todod: store a mapping ( openEditionTOkenId => bool )
        require(
            openEditionCollectorsMintedCount <= 54,
            "INTERNAL ERROR: Reached max tokens allowed for this category"
        );
        uint256 tokenId = openEditionCollectorsMintedCount;

        _safeMint(_wallet, tokenId);

        // -- store tokenId and address that minted
        if (_safeHavenTokenId != 0) {
            safeHavenTokenMintList[_safeHavenTokenId] = true;
        } else {
            graceIITokenMintList[_graceIITokenId] = true;
        }

        openEditionCollectorsMintedCount += 1;
        emit LogMintOpenEdition(_wallet, tokenId);
    }

    // Events
    event LogMintOneOfOneHolder(address indexed _address, uint256 _tokenId);
    event LogMintNonCollector(address indexed _address, uint256 _tokenId);
    event LogMintOpenEdition(address indexed _address, uint256 _tokenId);
}
