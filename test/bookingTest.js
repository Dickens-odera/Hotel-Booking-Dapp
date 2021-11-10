const Booking = artifacts.require("Booking");
const web3 = require('web3');

contract("Booking", function (accounts) {
  let bookingInstance;

  before(async () => {
    bookingInstance = await Booking.deployed();
    [owner, alice, bob] = accounts; 
  })

  it("gets deployed successfully", async function () {
    await Booking.deployed();
    return assert.isTrue(true);
  });

});
