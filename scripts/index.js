const { Minter, LOCAL_HOST_PROVIDER } = require("./models/minter");
const fs = require('fs');

const buildABetterFutureContract = fs.readFileSync("/Users/eo/workspace/lethabo-aniversary-drop/scripts/buildABetterFutureAbi.json");
const parsed = JSON.parse(buildABetterFutureContract);

const minter = new Minter(parsed, LOCAL_HOST_PROVIDER);

const buildABetterFutureContractAddress = "0xA509542aDa3196a38bD6fD03b253547EE09220C4";
const timePieceCommunityContract = "0x75D0bdbdd794E7679d46dF3369042f8bfC912906";

(async () => {
    await minter.at(buildABetterFutureContract);
    await minter.mint("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", 1);

    await minter.at(timePieceCommunityContract);
    await minter.mint("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", 1);
})()

