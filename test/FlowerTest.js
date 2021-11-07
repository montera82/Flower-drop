const Flower = artifacts.require("Flower");

contract("Flower", (accounts) => {

    const baseURI = "https://foo.com/";

    describe("Test flower", () => {
        beforeEach(async () => {
            this.contract = await Flower.new(baseURI);
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
            const collectorOfSafeHaven = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
            const collectorOfGrace2 = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
            
            const result1 = await this.contract.isOpenEditionCollector(collectorOfSafeHaven);
            const result2 = await this.contract.isOpenEditionCollector(collectorOfGrace2);

            assert.equal(result1, true, "Address should be returned as openCollector");
            assert.equal(result2, true, "Address should be returned as openCollector");
        });

        it("should proplery determine if a wallet is a non-collector", async() => {
            const wallet = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

            const result = await this.contract.isNonCollector(wallet);
            assert.equal(result, true);
        })
    });
})