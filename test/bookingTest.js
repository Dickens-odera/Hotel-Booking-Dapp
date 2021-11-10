const Booking = artifacts.require("Booking");

contract("Booking", function (accounts) {
  it("should assert true", async function () {
    await Booking.deployed();
    return assert.isTrue(true);
  });
});
