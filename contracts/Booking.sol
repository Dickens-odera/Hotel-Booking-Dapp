// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Room.sol';

contract Booking is Room{
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  struct BookingItem{
    uint roomId;
    uint bookingId;
    uint bookingDate;
    uint amountPaid;
    address payable tenant;
  }

  BookingItem[] public bookings;

  uint public totalBookings = 0;
  Counters.Counter private _bookingIds;

  event CheckoutSuccessfull(address indexed tenant, uint indexed roomId, uint indexed date);

  constructor() public {

  }

  function _registerBooking(uint _roomId, uint _bookingId,uint _amountPaid, address payable _tenant) internal{
    assert(_tenant != address(0));
    require(msg.sender != address(0));
    require(_bookingId != 0,"Booking ID cannot be zero");
    BookingItem memory newBooking = BookingItem(_roomId,_bookingId, block.timestamp,_amountPaid,_tenant);
    bookings.push(newBooking);
    totalBookings = totalBookings.add(1);
    emit RoomBooked(block.timestamp, msg.sender,msg.value,_roomId);
  }
  
  function bookRoom(uint _roomId,uint _numOfNights) public payable nonReentrant roomExists(_roomId) isNotBooked(_roomId){
    RoomItem storage room = roomItemId[_roomId];
    uint totalPayableAmount = _numOfNights.mul(room.pricePerNight);
    require(msg.sender != room.user,"You cannot book your own room");
    require(msg.sender.balance >= totalPayableAmount,"Insufficient Funds");
    require(_numOfNights != 0,"Number of nights cannot be zero");
    require(msg.value == totalPayableAmount * 1 ether,"Please pay the booking fee based on number of nights to be spent");
    _bookingIds.increment();
    uint currentBookingId = _bookingIds.current();
    room.user.transfer(msg.value);
    _setBooked(_roomId);
    _registerBooking(room.id,currentBookingId,msg.value, payable(msg.sender));
    roomTenant[room.id] = msg.sender;
  }

  function checkOut(uint _roomId) public payable nonReentrant {
    RoomItem storage room = roomItemId[_roomId];
    require(room.isBooked == true,"Room is not booked");
    require(msg.sender == roomTenant[room.id],"You currently dont reside in this room");
    room.isBooked = false;
    emit CheckoutSuccessfull(msg.sender,room.id,block.timestamp);
  }

}
