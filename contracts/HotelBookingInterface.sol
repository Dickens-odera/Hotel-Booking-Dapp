// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface HotelBookingInterface{
    function getName(uint _index) external virtual view returns(string memory);
    function getId(uint _index) external virtual view returns(uint);
}
