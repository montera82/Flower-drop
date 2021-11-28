const Flower = artifacts.require("Flower");
const MockedERC721 = artifacts.require("MockedERC721");

const fs = require('fs');
// const abi = require("../scripts/EdwinTopEstateERC721Token.json");
const Contract = require("@truffle/contract");

contract("Flower", (accounts) => {
    const baseURI = "https://foo.com/";
    
    // because we are referencing this contract from another directory other than the configured
    // artifact directory, we no longer access to defaults from Truffle.
    // https://github.com/trufflesuite/truffle/issues/1735#issuecomment-729684884
    // const MockERC721Token =  Contract(abi);
    // MockERC721Token.setProvider(new web3.providers.HttpProvider("http://localhost:7545"));
    // MockERC721Token.defaults({from: accounts[0] });
    const erc721 = 
    describe("Test flower", () => {
        beforeEach(async () => {
            this.buildABetterFutureContract = await MockedERC721.new();
            this.timePieceCommunityContract = await MockedERC721.new();
            this.contract = await Flower.new(
                baseURI, this.buildABetterFutureContract.address,
                this.timePieceCommunityContract.address
            );
        });

        it("should return correct baseURI", async () => {
            const result = await this.contract.baseURI.call();
            assert.equal(baseURI, result, "Base URI should be matched");
        });

        it("should return correct baseURI when set", async () => {
            const newURI = "https://bar.com/";
            await this.contract.setBaseURI(newURI);
            const result = await this.contract.baseURI.call();
            assert.equal(newURI, result, "Base URI should be matched when set");
        });

        it("should properly determine if a wallet is an openCollector", async () => {
            const tokenId1 = 1;
            const tokenId2 = 2;

            await this.buildABetterFutureContract.mint(accounts[0], tokenId1, { from: accounts[0]})
            await this.timePieceCommunityContract.mint(accounts[1], tokenId2)

            const result1 = await this.contract.isOpenEditionCollector(accounts[0]);
            const result2 = await this.contract.isOpenEditionCollector(accounts[1]);

            assert.equal(result1, true, "Address should be returned as openCollector");
            assert.equal(result2, true, "Address should be returned as openCollector");
        });

        it("should proplery determine if a wallet is a non-collector", async () => {
            const wallet = "0x821aEa9a577a9b44299B9c15c88cf3087F3b5544";

            const result = await this.contract.isNonCollector(wallet);
            assert.equal(result, true);
        })

        it("should be able to mintOpenEdition successfully", async () => {
            const tokenId1 = 1;
            const tokenId2 = 2;
            await this.buildABetterFutureContract.mint(accounts[0], tokenId1)
            await this.timePieceCommunityContract.mint(accounts[1], tokenId2)

            await this.contract.setMintOpen(true);
            
            await this.contract.mintOpenEdition(accounts[0]);
            await this.contract.mintOpenEdition(accounts[1]);

            const isInList1 = 
                await this.contract.openEditionCollectorsMintList.call(accounts[0]);
            const isInList2 = 
                await this.contract.openEditionCollectorsMintList.call(accounts[1]);
            
            assert.equal(isInList1, true, "address should be in list");
            assert.equal(isInList2, true, "address should be in list");
        })

        it.skip("should fail to mintOpenEdition for a non OpenEdition account", async () => {
            await this.contract.setMintOpen(true);
            await this.buildABetterFutureContract.mint(accounts[0], 1);

            // this line is usless but only adding cos of inconsistency btw tokenID array and minted
            // ensuring that []safeHavenTokens is same as minted, each time would do the trick
            await this.timePieceCommunityContract.mint(accounts[0], 2)

            const nonOpenEditionAccount = accounts[1];
            try {
                await this.contract.mintOpenEdition(nonOpenEditionAccount);    
            } catch (error) {
                assert.include(error.message, "Wallet must be an open edition collector")
            }
        })

        it.skip("should fail to mintOpenEdition for the same account more than once", async () => {
            const tokenId1 = 1;
            const tokenId2 = 2;
            await this.buildABetterFutureContract.mint(accounts[0], tokenId1)
            await this.timePieceCommunityContract.mint(accounts[0], tokenId2)
            await this.contract.setMintOpen(true);

            try {
                await this.contract.mintOpenEdition(accounts[0]); //#1
                await this.contract.mintOpenEdition(accounts[0]); //#2
            } catch (error) {
                assert.include(error.message, "Wallet already minted before for this category")
            }
        })
    });
})
