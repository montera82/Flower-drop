const Flower = artifacts.require("Flower");

// UNCOMMENT FOR RINKEBY PARAMETERS
// const baseURI = "https://gateway.pinata.cloud/ipfs/QmSjrqHDHsL9Z6jmizyqL3GuzLwVq8kp7JpoXL6xPV1Jku/"; // todo change to pinata ipfs link
// const buildABetterFutureContract =
//     "0x5FCEB6Dc31446066868e39BfC228b0C2c03feb86";
// const timePieceCommunityContract =
//     "0x4c55d19D34F29da106B92B159AEA584273217F6A";

// MAINNET
const baseURI = "https://gateway.pinata.cloud/ipfs/QmRu5rKug5rUMnn7s6kP9uPy7meZcSTMZhpTGt5rk6w8Uj/"; 
const buildABetterFutureContract =
    "0xdd69da9a83cedc730bc4d3c56e96d29acc05ecde";
const timePieceCommunityContract =
    "0x9307edc4f23d87f9783a999f870b728ab9d34fe5";

module.exports = function (deployer) {
    deployer.deploy(Flower, baseURI, buildABetterFutureContract, timePieceCommunityContract);
}
