const Booking = artifacts.require('Booking');

module.exports = function(deployer, network, accounts){
  deployer.deploy(Booking);
}
