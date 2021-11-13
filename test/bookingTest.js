const Booking = artifacts.require("Booking");
const web3 = require('web3');

contract("Booking", function (accounts) {
  let bookingInstance;
  let roomNightprice;
  let listingFeeToPay;
  let hotelId;
  let roomId;
  let totalHotels;
  let totalRooms;
  let totalNumberOfNights;
  before(async () => {
    bookingInstance = await Booking.deployed();
    [owner, alice, bob, john] = accounts;
    hotelId = 1;
    roomId = 1;
    totalHotels = 1;
    totalRooms = 1;
    totalNumberOfNights = 1;
    roomNightprice = await web3.utils.toWei("0.00000025", "ether");
    listingFeeToPay = await web3.utils.toWei("0.00043","ether");
  })

  it("gets deployed successfully", async function () {
    assert(bookingInstance,"Booking contract is deployed successfully");
  });

  it('can add a hotel before adding a room', async() =>{
    const newHotel = {
        id:hotelId,
        name:"Crypto Hotel",
        numOfRooms:10,
        description:"Some dummy crypto hotel name",
        location:"Kasarani, Nairobi - kenya",
        date: new Date().getTime(),
        hotelType:1
    };
    const result = await bookingInstance.addHotel(
      newHotel.numOfRooms,
      newHotel.name,
      newHotel.description,
      newHotel.location,
      {from:alice, value:listingFeeToPay});

      const totalNumberOfHotels = await bookingInstance.totalHotels();
      const listingFee = await bookingInstance.hotelListingFee();

      assert(result.receipt.status,true);
      assert.equal(totalNumberOfHotels, totalHotels);
      assert(result.logs[0].args.causer, alice);
      assert.equal(totalHotels,1);
      assert.equal(listingFee, listingFeeToPay);
  });

  it('can add a room', async() => {
      const hotel = await bookingInstance.hotelItemId(hotelId);
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
      const result = await bookingInstance.addRoom(
        id,
        newRoom.totalBeds,
        newRoom.pricePerNight,
        newRoom.number,
        newRoom.name,
        newRoom.description,
        {from: alice}
        );

      const room = await bookingInstance.roomItemId(roomId);
      const totalNumberOfRooms = await bookingInstance.totalRooms();

      assert(result.receipt.status, true);
      assert.equal(totalNumberOfRooms,totalRooms);
      assert(result.logs[0].args.user,alice);
      assert(result.logs[0].args.date,date);
      assert(result.logs[0].args.id,room.id);
  });

  it('can enable successful room booking', async() => {
    const room = await bookingInstance.roomItemId(roomId);
    let numberOfNights = 1;
    let totalAmountPayable = numberOfNights * room.pricePerNight;
    let amount = await web3.utils.toWei(totalAmountPayable.toString(),"ether");
    console.log(amount);
    const result = await bookingInstance.bookRoom(roomId, numberOfNights, { from: john, value: amount });

    const newRoomInstance = await bookingInstance.roomItemId(roomId);

    assert(result.receipt.status, true);
    assert(newRoomInstance.user !== john);
    assert(newRoomInstance.user === alice);

  });
});
