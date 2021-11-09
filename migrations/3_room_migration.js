const Room = artifacts.require('Room');

module.exports = function(deployer, network, accounts){
  deployer.deploy(Room);
}
