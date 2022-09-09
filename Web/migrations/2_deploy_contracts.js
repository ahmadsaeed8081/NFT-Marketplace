var NFTMarket = artifacts.require("./NFTMarket.sol");
var NFT = artifacts.require("./NFT.sol");


module.exports =function(deployer) {
     deployer.deploy(NFTMarket).then(function()
     {
       return deployer.deploy(NFT,NFTMarket.address);
     });
};
