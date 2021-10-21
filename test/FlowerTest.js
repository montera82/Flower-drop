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
    });
})