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
    mapping(address => bool) public openEditionCollectorsMintList;
    // tokenId => minted
    mapping(uint256 => bool) public safeHavenTokenMintList;
    mapping(uint256 => bool) public graceIITokenMintList;

    // counters
    // tokenIds 1 to 14
    uint256 private oneOfOneMintedCount = 1;

    // tokenIds 15 to 24
    uint256 private nonCollectorsMintedCount = 15;

    // tokenIds 25 to 54
    uint256 private openEditionCollectorsMintedCount = 25;

    bool private mintOpen = false;

    //these tokens must exists, otherwise the check fails cos of _exists
    uint256[] safeHavenTokens = [4216, 4209, 4213, 4215, 4207, 4214, 4211, 4208, 4210, 4212, 4206]; //babF
    uint256[] graceIITokens = [
        4173, 4168, 4176, 4236, 4171, 4212, 4190, 4098, 4092, 4167, 4112, 4228, 4149, 4209, 4244,
        4146, 4222, 4165, 4158, 4153, 4136, 4139, 4100, 4217, 4208, 4178, 4152, 4221, 4141, 4218,
        4087, 4082, 4097, 4071, 4150, 4204, 4193, 4242, 4220, 4099, 4140, 4077, 4237, 4170, 4162,
        4073, 4101, 4240, 4142, 4085, 4148, 4191, 4129, 4128, 4172, 4253, 4070, 4095, 4199, 4081,
        4108, 4151, 4084, 4206, 4124, 4110, 4230, 4106, 4120, 4216, 4093, 4154, 4198, 4175, 4103,
        4137, 4117, 4118, 4192, 4185, 4076, 4078, 4223, 4213, 4186, 4225, 4159, 4210, 4134, 4116,
        4114, 4145, 4187, 4133, 4243, 4096, 4232, 4111, 4188, 4183, 4090, 4104, 4211, 4219, 4164,
        4089, 4161, 4113, 4235, 4197, 4147, 4207, 4229, 4086, 4094, 4224, 4122, 4157, 4109, 4251,
        4181, 4254, 4125, 4252, 4130, 4248, 4182, 4144, 4163, 4166, 4105, 4184, 4201, 4189, 4156,
        4249, 4123, 4169, 4115, 4231, 4215, 4138, 4234, 4131, 4119, 4247, 4074, 4179, 4202, 4246,
        4155, 4121, 4180, 4102, 4079, 4238, 4143, 4245, 4080, 4083, 4075, 4135, 4195, 4200, 4203,
        4239, 4233, 4196, 4227, 4132, 4250, 4107, 4174, 4160, 4177, 4226, 66, 67, 68, 4194, 4088,
        4205, 4072, 4214, 4241, 4126, 4127, 4091
      ]; // IRB

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
        nonCollectors[0x7ed90FDd530Ec92E90E197bA891378b1f9680e0A] = true;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
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

    function isSafeHavenOwner(address _wallet, uint256 _tokenId)
        public
        view
        returns (bool)
    {
        ERC721 buildABetterFuture = ERC721(BuildABetterFutureContract);

        if (buildABetterFuture.ownerOf(_tokenId) == _wallet) {
            return true;
        }
        return false;
    }

    function isGraceIIOwner(address _wallet, uint256 _tokenId)
        public
        view
        returns (bool)
    {
        ERC721 timePieceCommunity = ERC721(TimePieceCommunityContract);

        if (timePieceCommunity.ownerOf(_tokenId) == _wallet) {
            return true;
        }
        return false;
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
        emit LogMintNonCollector(_wallet, tokenId);
    }

    // function to allow open-edition collector mint
    function mintOpenEdition(address _wallet) external whenMintOpened {
        (
            bool isHolder,
            uint256 _safeHavenTokenId,
            uint256 _graceIITokenId
        ) = isOpenEditionCollector(_wallet);
        require(isHolder == true, "Must be a holder of GraceII or SafeHaven");
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
        openEditionCollectorsMintList[_wallet] = true;
        emit LogMintOpenEdition(_wallet, tokenId);
    }

    // Only owner - admin methods
    function setBaseURI(string memory newURI) public onlyOwner {
        baseURI = newURI;
    }

    function setMintOpen(bool value) external onlyOwner {
        require(mintOpen != value, "mintOpen already this value");
        mintOpen = value;
    }

    // these method below should never reallybe used as they may reset the counters for available mints
    // only added here to prevent total lockout
    function addOneOfOneCollector(address _wallet) external onlyOwner {
        require(
            oneOfOneCollectors[_wallet] != true,
            "Wallet has already added to the one of one collector list"
        );
        oneOfOneCollectors[_wallet] = true;
    }

    function addNonCollector(address _wallet) external onlyOwner {
        require(
            nonCollectors[_wallet] != true,
            "Wallet has already added to the non collector list"
        );
        nonCollectors[_wallet] = true;
    }

    // Events
    event LogMintOneOfOneHolder(address indexed _address, uint256 _tokenId);
    event LogMintNonCollector(address indexed _address, uint256 _tokenId);
    event LogMintOpenEdition(address indexed _address, uint256 _tokenId);
}
