// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;//>=0.4.22 <0.9.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';

/**
  @dev A simple Smart Contract for hotel management
  @author Dickens Odera dickensodera9@gmail.com
**/
contract Hotel {
  using SafeMath for uint256;

  uint public totalHotels = 0; //the total number of the hotels

  enum HOTEL_CATEGORY {CHAIN_HOTEL, MOTEL, RESORT, INN, ALL_SUITS, BOUTIGUE, EXTENDED_STAY} // hotel types
  HOTEL_CATEGORY public hotelCategory;
  HOTEL_CATEGORY constant DEFAULT_HOTEL_TYPE = HOTEL_CATEGORY.CHAIN_HOTEL; //default hotel type as it is the most common around the world

  //Group hotel data together in a Struct
  struct HotelItem{
    uint id;
    uint totalRooms;
    string name;
    HOTEL_CATEGORY hotelCategory;
    //string hotelType;
    string description;
    string locationAddress;
  }

  HotelItem[] public hotelItems; //hotels array of the Hotel struct above

  mapping(address => HotelItem) public hotelOwner; //the owner of this hotel

  //events
  event HotelCreated(uint date, address indexed caller, uint id);
  //errors
//   constructor() public {
//   }

  function addHotel(uint _id, uint _numOfRooms, string memory _name,HOTEL_CATEGORY _category,string memory _description, string memory _location) public{
    assert(_category == DEFAULT_HOTEL_TYPE);
    HotelItem memory hotel = HotelItem(_id, _numOfRooms, _name, DEFAULT_HOTEL_TYPE,_description, _location);
    hotelItems.push(hotel);
    hotelOwner[msg.sender] = hotel;
    //hotelItems.push(HotelItem(_id,_numOfRooms,_name,_description, _location));
    totalHotels = totalHotels.add(1);
    emit HotelCreated(block.timestamp, msg.sender, _id);
  }
}
