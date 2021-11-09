const Hotel = artifacts.require("Hotel");
const web3 = require('web3');
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hotel", async(accounts) => {
  let hotelIntance;
  beforeEach( async() => {
    hotelIntance = await Hotel.deployed();
    [alice,bob] = accounts;
  });

  it("gets deployed successfully", async() => {
    return assert(hotelIntance,"Contract deployed successfully");
  });

  it('can add a new hotel hotel', async() => {
    let amount = await web3.utils.toWei("0.00043","ether");
    let newHotel = {
        id:1,
        name:"Crypto Hotel",
        numOfRooms:10,
        description:"Some dummy crypto hotel name",
        location:"Kasarani, Nairobi - kenya",
        date: new Date().getTime(),
        hotelType:1
    };
    let result = await hotelIntance.addHotel(
      newHotel.numOfRooms,
      newHotel.name,
      newHotel.description,
      newHotel.location,
      {from:alice, value:amount});

      assert(result.receipt.status,true);
      assert(result.logs[0].args.causer, alice);
      //assert.equal(hotelIntance.totalHotels.call(alice), 1);
  });
});
