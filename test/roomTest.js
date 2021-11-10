const Room = artifacts.require("Room");
const Hotel = artifacts.require("Hotel");
const web3 = require('web3');

contract("Room", async(accounts) => {
  let roomInstance;
  let hotelInstance;
  let hotelId;
  let roomId;
  before( async() => {
    roomInstance = await Room.deployed();
    hotelInstance = await Hotel.deployed();
    [owner,alice, bob] = accounts;
    hotelId = 1;
    roomId = 1;
  });

  it("gets deployed sucessfully", async () => {
      assert(roomInstance,"Room contract deployed successfully");
  });

  it('can add a hotel before adding a room', async() =>{
    const amount = await web3.utils.toWei("0.00043","ether");
    const newHotel = {
        id:hotelId,
        name:"Crypto Hotel",
        numOfRooms:10,
        description:"Some dummy crypto hotel name",
        location:"Kasarani, Nairobi - kenya",
        date: new Date().getTime(),
        hotelType:1
    };
    const result = await roomInstance.addHotel(
      newHotel.numOfRooms,
      newHotel.name,
      newHotel.description,
      newHotel.location,
      {from:alice, value:amount});

      const totalHotels = await roomInstance.totalHotels();
      const listingFee = await roomInstance.hotelListingFee();

      assert(result.receipt.status,true);
      assert(result.logs[0].args.causer, alice);
      assert.equal(totalHotels,1);
      assert.equal(listingFee, amount);
  });

  it('can add a room', async() => {
      const hotel = await roomInstance.hotelItemId(hotelId);
      const id = hotel.id;
      const date = new Date().getTime();

      let newRoom = {
        id:id,
        totalBeds:4,
        hotelId:hotelId,
        pricePerNight: web3.utils.toWei('0.000064', 'ether'),
        number:1,
        isBooked:false,
        user:alice,
        name:"First Name",
        description:"This is the first room"
      };
      const result = await roomInstance.addRoom(
        id,
        newRoom.totalBeds,
        newRoom.pricePerNight,
        newRoom.number,
        newRoom.name,
        newRoom.description,
        {from: alice}
        );

      const room = await roomInstance.roomItemId(roomId);

      assert(result.receipt.status, true);
      assert(result.logs[0].args.user,alice);
      assert(result.logs[0].args.date,date);
      assert(result.logs[0].args.id,room.id);
  });

  it('can set room night price', async() => {
    const roomItem = await roomInstance.roomItemId(roomId);
    const price = await web3.utils.toWei("0.0025", "ether");
    const preViousPrice = roomItem.setNightPrice;

    const result = await roomInstance.setNightPrice(roomId, price,{ from: alice});
    const newPrice = await roomInstance.roomItemId(roomId);

    assert(result.receipt.status,true);
    assert(preViousPrice !== newPrice);
    assert(result.logs[0].args.user,alice);
    assert(result.logs[0].args.price, newPrice);
    assert(result.logs[0].args.date, new Date().getTime());
  });

  it('can only allow a room owner to set a room\'s night price', async() => {

  });
});
