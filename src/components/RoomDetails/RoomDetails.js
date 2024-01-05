import React from "react";

const RoomDetails = ({ floorDetails }) => {
  // Function to create checkbox elements
  const createCheckbox = (type, floorNo, roomNo) => (
    <div key={`${floorNo}-${type}-${roomNo}`}>
      <input type="checkbox" id={`${floorNo}-${type}-${roomNo}`} />
      <label
        htmlFor={`${floorNo}-${type}-${roomNo}`}
        className="text-black"
      >{`Room ${roomNo}`}</label>
    </div>
  );

  // Function to create room type container
  const createRoomTypeContainer = (type, floorNo, numberOfRooms) => (
    <div
      key={`${floorNo}-${type}`}
      style={{ border: "1px solid black", padding: "10px", margin: "10px" }}
    >
      <h4 className="text-black">{`${type} Rooms:`}</h4>
      {Array.from({ length: numberOfRooms }, (_, roomNo) =>
        createCheckbox(type, floorNo, roomNo + 1)
      )}
    </div>
  );

  return (
    <div>
      <h2 className="text-black">Room Details per Floor</h2>
      {floorDetails.map((floor) => (
        <div key={floor.floorNo}>
          <h3 className="text-black">Floor {floor.floorNo}:</h3>
          {floor.types.map((roomType) =>
            createRoomTypeContainer(
              roomType.type,
              floor.floorNo,
              roomType.numberOfRooms
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomDetails;
