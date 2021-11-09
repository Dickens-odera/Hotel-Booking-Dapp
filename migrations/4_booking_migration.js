const Booking = artifacts.require('Booking');

module.exports = function(deployer, netork, accounts){
  deployer.deploy(Booking);
}
