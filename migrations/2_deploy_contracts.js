const Flower = artifacts.require("Flower");

const baseURI = "https://gateway.pinata.cloud/ipfs/QmWiCDsDycw2ZDGkMSm5ReYRDNASuYmGM3WFU6DwCX7Wrz/"; // todo change to pinata ipfs link
const buildABetterFutureContract =
    "0xA509542aDa3196a38bD6fD03b253547EE09220C4";
const timePieceCommunityContract =
    "0x75D0bdbdd794E7679d46dF3369042f8bfC912906";

module.exports = function (deployer) {
    deployer.deploy(Flower, baseURI, buildABetterFutureContract, timePieceCommunityContract);
}
