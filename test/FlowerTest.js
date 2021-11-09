const Flower = artifacts.require("Flower");
const ERC721Enummerable = artifacts.require("EdwinTopEstateERC721Token");

contract("Flower", (accounts) => {

    const baseURI = "https://foo.com/";
    const buildABetterFutureContract =
        "0xA509542aDa3196a38bD6fD03b253547EE09220C4";
    const timePieceCommunityContract =
        "0xABa7902442c5739c6f0c182691d48D63d06A212E";

    describe("Test flower", () => {
        beforeEach(async () => {
            this.buildABetterFutureContract = await ERC721Enummerable.new("", "");
            this.timePieceCommunityContract = await ERC721Enummerable.new("", "");

            console.log("ddddd",this.buildABetterFutureContract.address)
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

            await this.buildABetterFutureContract.mint(accounts[0], tokenId1)
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
            await this.buildABetterFutureContract.mint(accounts[1], tokenId2)

            await this.contract.setMintOpen(true);
            
            await this.contract.mintOpenEdition(accounts[0]);
            await this.contract.mintOpenEdition(accounts[1]);

            const isInList1 = 
                await this.contract.openEditionCollectorsMintList.call(accounts[0]);
            const isInList2 = 
                await this.contract.openEditionCollectorsMintList.call(accounts[1]);
                
            const openEditionCollectorsMintedCount = 
                await this.contract.openEditionCollectorsMintedCount.call();
            
            assert.equal(isInList1, true, "address should be in list");
            assert.equal(isInList2, true, "address should be in list");
            assert.equal(openEditionCollectorsMintedCount, 2, "total minted token count should be 2")
        })

        it("should fail to mintOpenEdition for a non OpenEdition account", async () => {
            await this.contract.setMintOpen(true);
            try {
                await this.contract.mintOpenEdition(accounts[0]);    
            } catch (error) {
                assert.include(error.message, "Wallet must be an open edition collector")
            }
        })

        it("should fail to mintOpenEdition for the same account more than once", async () => {
            const tokenId1 = 1;
            await this.buildABetterFutureContract.mint(accounts[0], tokenId1)
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