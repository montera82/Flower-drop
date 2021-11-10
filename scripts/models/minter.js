
const LOCAL_HOST_PROVIDER = "http://localhost:7545";
const contract = require("@truffle/contract");
const Web3 = require('web3');

class Minter {

    // acccept abi and deploy it at an address
    constructor(abi, provider) {
        this.contract = contract(abi);
        const _provider = new Web3.providers.HttpProvider(provider);

        this.contract.setProvider(_provider);
        this.web3 = new Web3(_provider);
    }

    async _setup() {
        this.accounts = await this.web3.eth.getAccounts();
        this.contract.defaults({ from: this.accounts[0] })

    }
    async deploy() {
        await this._setup();

        this.deployed = await this.contract.new("", "");
        console.log("Address: ", this.deployed.address);  
    }

    async at(_address) {
        await this._setup();

        this.deployed = await this.contract.at(_address);
        console.log(this.deployed.address);
    }

    // mint function 
    async mint(to, tokenId) {
        await this.deployed.mint(to, tokenId);
        console.log("minted ", tokenId)
    }
}

module.exports = {
    LOCAL_HOST_PROVIDER,
    Minter
}
