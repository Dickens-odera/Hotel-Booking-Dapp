// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import './Hotel.sol';

contract Room is Hotel{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    uint public totalRooms;
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
    mapping (uint => address) public roomTenant; //who currently resides in the room
    mapping(uint => RoomItem) public roomItemId; //to help track a room item by it's id

    event NewRoomCreated(address indexed user, uint date, uint id);
    event RoomNightPriceSet(address indexed user, uint price, uint indexed date);
    event RoomBooked(uint date, address indexed tenant, uint indexed amountPaid, uint indexed roomId);

    constructor() public{
        totalRooms = 0;
    }

    modifier roomExists(uint _index){
        bool exists = false;
        for(uint i = 0; i < rooms.length; i++){
            if(i == _index){
                exists = true;
            }
        }
        require(exists == true,"Room Does Not Exist");
        _;
    }

    modifier roomNameDoesNotExist(string memory _name) {
      bool exists = false;
      for(uint i = 0; i < rooms.length; i++){
          if(keccak256(abi.encodePacked(rooms[i].name)) == keccak256(abi.encodePacked(_name))){
              exists = true;
          }
      }
      require(exists == false,"Room Name Exists");
      _;
    }

    modifier onlyRoomOwner(uint _index){
        require(msg.sender == rooms[_index].user,"You Do Not Own This Room");
        _;
    }

    modifier isNotBooked(uint _index){
      require(rooms[_index].isBooked == false,"Room is occupied");
      _;
    }

    function addRoom(uint _hotelIndex, uint _totalBeds, uint _pricePerNight, uint _number,string memory _name, string memory _description) public
    hasListedHotel
    ownsHotel(_hotelIndex)
    hotelExists(_hotelIndex)
    roomNameDoesNotExist(_name)
    {
        _roomIds.increment();
        uint currentRoomId = _roomIds.current();
        uint hotelId = hotelItems[_hotelIndex].id;
        RoomItem memory roomItem = RoomItem(currentRoomId,_totalBeds,hotelId,_pricePerNight, _number, false, payable(msg.sender),_name,_description);
        rooms.push(roomItem);
        roomOwner[msg.sender] = roomItem;
        roomItemId[currentRoomId] = roomItem;
        totalRooms = totalRooms.add(1);
        emit NewRoomCreated(msg.sender, block.timestamp, currentRoomId);
    }

    function getRoomBioData(uint _index) public view roomExists(_index) returns(
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
            RoomItem storage room = rooms[_index];
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

    function getName(uint _index) external virtual view override returns(string memory){
      return rooms[_index].name;
    }

    function getId(uint _index) external virtual view override returns(uint){
        return rooms[_index].id;
    }

    function setNightPrice(uint _index, uint _price) public onlyRoomOwner(_index){
        require(_price != 0,"price Cannot be zero");
        rooms[_index].pricePerNight = _price;
        emit RoomNightPriceSet(msg.sender, _price, block.timestamp);
    }

    function _setBooked(uint _index) internal roomExists(_index){
        rooms[_index].isBooked = true;
    }

    function listRooms() public view returns(RoomItem[] memory){
        return rooms;
    }
}
