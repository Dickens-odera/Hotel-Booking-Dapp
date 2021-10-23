// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface HotelBookingInterface{
    function getName(uint _index) external view returns(string memory);
    function getId(uint _index) external view returns(uint);
}
