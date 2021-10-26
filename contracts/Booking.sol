// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './Room.sol';

contract Booking is Room{
  using SafeMath for uint256;

  struct BookingItem{
    uint roomId;
    uint bookingId;
    uint bookingDate;
    uint amountPaid;
    address payable tenant;
  }

  BookingItem[] public bookings;

  uint public totalBookings;
  uint public bookingId;

  constructor() public {
    totalBookings = 0;
    bookingId = 0;
  }

  function bookRoom(uint _index,uint _numOfNights) public payable roomExists(_index) isNotBooked(_index){
    RoomItem storage room = rooms[_index];
    uint totalPayableAmount = room.pricePerNight.mul(_numOfNights);
    require(msg.sender != room.user,"You cannot book your own room");
    require(msg.sender.balance >= totalPayableAmount,"Insufficient Funds");
    require(msg.value == totalPayableAmount,"Please enter the correct amount");
    require(_numOfNights != 0,"Number of nights cannot be zero");
    room.user.balance.add(totalPayableAmount);
    msg.sender.balance.sub(totalPayableAmount);
    bookingId = bookingId.add(1);
    room.user.transfer(msg.value);
    _setBooked(_index);
    _registerBooking(room.id,bookingId,msg.value, payable(msg.sender));
    roomTenant[room.id] = msg.sender;
  }

  function checkOut(uint _index) public payable {
    RoomItem storage room = rooms[_index];
    require(room.isBooked == true,"Room is not booked");
    require(msg.sender == roomTenant[_index],"You currently dont reside in this room");
    room.isBooked = false;
  }

  function _registerBooking(uint _roomId, uint _bookingId,uint _amountPaid, address payable _tenant) internal{
    BookingItem memory newBooking = BookingItem(_roomId,_bookingId, block.timestamp,_amountPaid,_tenant);
    bookings.push(newBooking);
    totalBookings = totalBookings.add(1);
    emit RoomBooked(block.timestamp, msg.sender,msg.value,_roomId);
  }
}
