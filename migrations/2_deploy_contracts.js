const Flower = artifacts.require("Flower");

module.exports = function(deployer) {
    deployer.deploy(Flower, "");
}