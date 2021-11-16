// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Hotel.sol';

contract Room is Hotel{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint public totalRooms = 0;
    Counters.Counter private _roomIds;

    struct RoomItem{
        uint id;
        uint totalBeds;
        uint hotelId;
        uint pricePerNight;
        uint number;
        bool isBooked;
        address payable user;
        string name;
        string description;
    }

    RoomItem[] public rooms;

    mapping(address => RoomItem) public roomOwner;
    mapping(uint => address) public roomTenant; //who currently resides in the room
    mapping(uint => RoomItem) public roomItemId; //to help track a room item by it's id
    mapping(uint => bool) public existingRoomItem;
    mapping(string => bool) public existingRoomItemName;

    event NewRoomCreated(address indexed user, uint date, uint id);
    event RoomNightPriceSet(address indexed user, uint price, uint indexed date);
    event RoomBooked(uint date, address indexed tenant, uint indexed amountPaid, uint indexed roomId);

    constructor() public{

    }

    modifier roomExists(uint _roomId){
        require(existingRoomItem[_roomId] == true,"Room Does Not Exist");
        _;
    }

    modifier roomNameDoesNotExist(string memory _name) {
      require(bytes(_name).length > 0,"Please specify the room name");
      require(existingRoomItemName[_name] == false,"Room Name Exists");
      _;
    }

    modifier onlyRoomOwner(uint _roomId){
        require(msg.sender == roomItemId[_roomId].user,"You Do Not Own This Room");
        _;
    }

    modifier isNotBooked(uint _roomId){
      require(roomItemId[_roomId].isBooked == false,"Room is occupied");
      _;
    }

    function addRoom(uint _hotelId, uint _totalBeds, uint _pricePerNight, uint _number,string memory _name, string memory _description) public
    hasListedHotel(_hotelId)
    ownsHotel(_hotelId)
    hotelExists(_hotelId)
    roomNameDoesNotExist(_name)
    {
        require(msg.sender != address(0));
        require(_totalBeds != 0,"Number of beds cannot be zero");
        require(bytes(_description).length > 0,"Please specify the room description");
        require(_pricePerNight != 0,"The room night price cannot be zero");
        _roomIds.increment();
        uint currentRoomId = _roomIds.current();
        uint hotelId = hotelItemId[_hotelId].id;
        roomItemId[currentRoomId]  = RoomItem(currentRoomId,_totalBeds,hotelId,_pricePerNight, _number, false, payable(msg.sender),_name,_description);
        rooms.push(roomItemId[currentRoomId]);
        roomOwner[msg.sender] = roomItemId[currentRoomId];
        totalRooms = totalRooms.add(1);
        existingRoomItem[currentRoomId] = true;
        existingRoomItemName[_name] = true;
        emit NewRoomCreated(msg.sender, block.timestamp, currentRoomId);
    }

    function getRoomBioData(uint _roomId) public view roomExists(_roomId) returns(
        uint _id,
        uint _numOfBeds,
        uint _hotelId,
        uint _pricePerNight,
        uint _number,
        bool _isBooked,
        address _user,
        string memory _name,
        string memory _description)
        {
            RoomItem storage room = roomItemId[_roomId];
            _id = room.id;
            _numOfBeds = room.totalBeds;
            _hotelId = room.hotelId;
            _pricePerNight = room.pricePerNight;
            _number = room.number;
            _isBooked = room.isBooked;
            _user = room.user;
            _name = room.name;
            _description = room.description;
        }

    function getName(uint _roomId) external virtual view override returns(string memory){
      return roomItemId[_roomId].name;
    }

    function getId(uint _roomId) external virtual view override returns(uint){
        return roomItemId[_roomId].id;
    }

    function setNightPrice(uint _roomId, uint _price) public onlyRoomOwner(_roomId){
        require(_price != 0,"price Cannot be zero");
        roomItemId[_roomId].pricePerNight = _price;
        emit RoomNightPriceSet(msg.sender, _price, block.timestamp);
    }

    function _setBooked(uint _roomId) internal roomExists(_roomId){
        roomItemId[_roomId].isBooked = true;
    }

    function listRooms() public view returns(RoomItem[] memory){
        return rooms;
    }
}
