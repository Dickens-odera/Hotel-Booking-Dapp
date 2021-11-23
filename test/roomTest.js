const Room = artifacts.require("Room");
const Hotel = artifacts.require("Hotel");
const web3 = require('web3');

contract("Room", async(accounts) => {
  let roomInstance;
  let hotelInstance;
  let hotelId;
  let roomId;
  let roomNightprice;
  let listingFeeToPay;
  before( async() => {
    roomInstance = await Room.deployed();
    hotelInstance = await Hotel.deployed();
    [owner,alice, bob] = accounts;
    hotelId = 1;
    roomId = 1;
    roomNightprice = await web3.utils.toWei("0.0025", "ether");
    listingFeeToPay = await web3.utils.toWei("0.00043","ether");
  });

  it("gets deployed sucessfully", async () => {
      assert(roomInstance,"Room contract deployed successfully");
  });

  it('can add a hotel before adding a room', async() =>{
    const newHotel = {
      id:hotelId,
      name:"Crypto Hotel",
      numOfRooms:10,
      description:"Some dummy crypto hotel name",
      location:"Kasarani, Nairobi - kenya",
      date: new Date().getTime(),
      hotelType:1,
      photo: "https://ipfs.infura.io/gsjsbsgddndj5337748474jfhfj"
    };
    const result = await roomInstance.addHotel(
      newHotel.numOfRooms,
      newHotel.name,
      newHotel.description,
      newHotel.location,
      newHotel.photo,
      {from:alice, value:listingFeeToPay});

      const totalHotels = await roomInstance.totalHotels();
      const listingFee = await roomInstance.hotelListingFee();

      assert(result.receipt.status,true);
      assert(result.logs[0].args.causer, alice);
      assert.equal(totalHotels,1);
      assert.equal(listingFee, listingFeeToPay);
  });

  it('can add a room', async() => {
      const hotel = await roomInstance.hotelItemId(hotelId);
      const id = hotel.id;
      const date = new Date().getTime();

      let newRoom = {
        id:id,
        totalBeds:4,
        hotelId:hotelId,
        pricePerNight: roomNightprice,
        number:1,
        isBooked:false,
        user:alice,
        name:"First Room Name",
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
    const preViousPrice = roomItem.pricePerNight;

    const result = await roomInstance.setNightPrice(roomId, roomNightprice,{ from: alice});
    const newPrice = await roomInstance.roomItemId(roomId);

    assert(result.receipt.status,true);
    assert(preViousPrice !== newPrice);
    assert(result.logs[0].args.user,alice);
    assert(result.logs[0].args.price, newPrice);
    assert(result.logs[0].args.date, new Date().getTime());
  });

  it('can only allow a room owner to set a room\'s night price', async() => {
    try{
      const result = await roomInstance.setNightPrice(roomId,roomNightprice, {from: bob});
    }catch(err){
      assert(err.message.includes("You Do Not Own This Room"));
      return;
    }
    assert(false);
  });

  it('can fetch a room\'s details by room id ', async() => {
      const room = await roomInstance.roomItemId(roomId);
      const result = await roomInstance.getRoomBioData(room.id);
      const roomName = result._name;

      assert.equal(roomName,'First Room Name');
  });
});
