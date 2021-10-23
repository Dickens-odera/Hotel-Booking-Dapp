// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import './HotelBookingInterface.sol';

  /**
   * @dev A simple Smart Contract for hotel management
   * @author Dickens Odera dickensodera9@gmail.com
  **/


contract Hotel is Ownable, HotelBookingInterface {
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
    address user;
  }

  HotelItem[] public hotelItems; //hotels array of the Hotel struct above

  mapping(address => HotelItem) public hotelOwner; //the owner of this hotel

  //events
  event HotelCreated(uint date, address indexed causer, uint indexed id);
  event HotelCategoryChanged(address indexed causer, uint date, HOTEL_CATEGORY indexed newCategory);
  event HotelOwnerChanged(address indexed causer, address indexed newOwner, uint date);

  constructor() public {
      totalHotels = 0;
      currentHotelId = 0;
  }

  //ensure that the hotel exists in the blockchain before performing related transactions
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

  //to avoid duplicate hotel names in the contract
  modifier hotelNameExists(string memory _name){
     bool exists = false;
     for(uint i = 0; i < hotelItems.length; i++){
         if(keccak256(abi.encodePacked(hotelItems[i].name)) == keccak256(abi.encodePacked(_name))){
             exists = true;
         }
     }
     require(exists == false,"Hotel Name Exists");
     _;
  }

  //ensure the transactionsender owns this hotel before the transaction
  modifier ownsHotel(uint _index){
      require(msg.sender == hotelItems[_index].user,"You Do Not Own This Hotel Item");
      _;
  }

  function addHotel(uint _numOfRooms, string memory _name,string memory _description, string memory _location) public onlyOwner() hotelNameExists(_name){
    currentHotelId = currentHotelId.add(1);
    HotelItem memory hotel = HotelItem(currentHotelId, _numOfRooms, block.timestamp, _name, DEFAULT_HOTEL_TYPE,_description, _location, msg.sender);
    hotelItems.push(hotel);
    hotelOwner[msg.sender] = hotel;
    totalHotels = totalHotels.add(1);
    emit HotelCreated(block.timestamp, msg.sender, currentHotelId);
  }

  function listAllHotels() public view returns(HotelItem[] memory){
      return hotelItems;
  }

  function getHotelBioData(uint _index) public view hotelExists(_index) returns(
      uint _id,
      uint _totalRooms,
      uint _date,
      string memory _name,
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

  function changeHotelCategory(uint _index, HOTEL_CATEGORY _category) public hotelExists(_index) ownsHotel(_index) {
     HotelItem storage hotelItem = hotelItems[_index];
     assert(_category != DEFAULT_HOTEL_TYPE);
     assert(_category != hotelItem.hotelCategory);
     hotelItem.hotelCategory = _category;
     emit HotelCategoryChanged(msg.sender, block.timestamp, _category);
  }

  function getName(uint _index) external view override hotelExists(_index)returns(string memory){
      return hotelItems[_index].name;
  }

  function getId(uint _index) external view override hotelExists(_index) returns(uint){
      return hotelItems[_index].id;
  }

  function changeHotelOwner(address _newOwner, uint _index) public hotelExists(_index) ownsHotel(_index){
      require(msg.sender != _newOwner,"You are the rightful owner already");
      hotelItems[_index].user = _newOwner;
      emit HotelOwnerChanged(msg.sender, _newOwner, block.timestamp);
  }
}
