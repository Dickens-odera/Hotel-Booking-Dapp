// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;//>=0.4.22 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';


  /**
   * @dev A simple Smart Contract for hotel management
   * @author Dickens Odera dickensodera9@gmail.com
  **/


contract Hotel {
  using SafeMath for uint256;

  uint public totalHotels; //the total number of the hotels
  uint public currentHotelId; //hotel id to be inrecemented when a new hotel is created

  enum HOTEL_CATEGORY {CHAIN_HOTEL, MOTEL, RESORT, INN, ALL_SUITS, BOUTIGUE, EXTENDED_STAY} // hotel types
  HOTEL_CATEGORY public hotelCategory;
  HOTEL_CATEGORY constant DEFAULT_HOTEL_TYPE = HOTEL_CATEGORY.CHAIN_HOTEL; //default hotel type as it is the most common around the world

  //Group hotel data together in a Struct
  struct HotelItem{
    uint id;
    uint totalRooms;
    uint creationDate;
    string name;
    HOTEL_CATEGORY hotelCategory;
    string description;
    string locationAddress;
  }

  HotelItem[] public hotelItems; //hotels array of the Hotel struct above

  mapping(address => HotelItem) public hotelOwner; //the owner of this hotel

  //events
  event HotelCreated(uint date, address indexed caller, uint indexed id);


  constructor() public {
      totalHotels = 0;
      currentHotelId = 0;
  }

  modifier hotelExists(uint _index){
      bool hotelExists = false;
      for(uint i = 0; i < hotelItems.length; i++){
          if(i == _index){
              hotelExists = true;
          }
      }
      require(hotelExists == true,"Hotel Does Not Exist");
      _;
  }

  function addHotel(uint _numOfRooms, string memory _name,string memory _description, string memory _location) public{
    currentHotelId = currentHotelId.add(1);
    HotelItem memory hotel = HotelItem(currentHotelId, _numOfRooms, block.timestamp, _name, DEFAULT_HOTEL_TYPE,_description, _location);
    hotelItems.push(hotel);
    hotelOwner[msg.sender] = hotel;
    totalHotels = totalHotels.add(1);
    emit HotelCreated(block.timestamp, msg.sender, currentHotelId);
  }

  function getHotelBioData(uint _index) public view hotelExists(_index) returns(
      uint _id,
      uint _totalRooms,
      uint _date,
      string  memory _name,
      string memory _description,
      string memory _location,
      HOTEL_CATEGORY _category
      ){
    HotelItem storage hotelItem = hotelItems[_index];
    _id = hotelItem.id;
    _totalRooms = hotelItem.totalRooms;
    _date = hotelItem.creationDate;
    _name = hotelItem.name;
    _description = hotelItem.description;
    _location = hotelItem.locationAddress;
    _category = hotelItem.hotelCategory;
  }

}
