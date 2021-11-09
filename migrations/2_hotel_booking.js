const Hotel = artifacts.require('Hotel');
module.exports = function(deployer, network, accounts){
  deployer.deploy(Hotel);
}
