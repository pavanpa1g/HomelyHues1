"use client";
import React, { useEffect, useState } from "react";

import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";

import "./page.css";
import { useDispatch, useSelector } from "react-redux";

const data = [
  {
    name: "Room 1",
    id: "1",
    beds: [
      {
        bedNumber: 1,
        status: true,
        bookingId: "",
      },
      {
        bedNumber: 2,
        status: false,
        bookingId: "",
      },
      {
        bedNumber: 3,
        status: false,
        bookingId: true,
      },
    ],
  },
  {
    name: "Room 2",
    id: "2",
    beds: [
      {
        bedNumber: 1,
        status: true,
        bookingId: "",
      },
      {
        bedNumber: 2,
        status: false,
        bookingId: "",
      },
      {
        bedNumber: 3,
        status: false,
        bookingId: false,
      },
    ],
  },
  {
    name: "Room 3",
    id: "3",
    beds: [
      {
        bedNumber: 1,
        status: false,
        bookingId: "",
      },
      {
        bedNumber: 2,
        status: false,
        bookingId: "",
      },
      {
        bedNumber: 3,
        status: false,
        bookingId: true,
      },
    ],
  },
  {
    name: "Room 4",
    id: "4",
    beds: [
      {
        bedNumber: 1,
        status: true,
        bookingId: "",
      },
      {
        bedNumber: 2,
        status: true,
        bookingId: "",
      },
      {
        bedNumber: 3,
        status: false,
        bookingId: true,
      },
    ],
  },
];

import roomJson from "@/json/room.json";
import { setSelectedHostel } from "@/store/features/selectedHostelSlice";
import apiStatusConstants from "@/utils/apiconstants";
import RoomDetails from "@/components/RoomDetails/RoomDetails";

const page = (props) => {
  const { id } = props.params;

  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const selectedHostelSelector = useSelector((state) => state.selectedHostel);
  const { hostelName, roomTypes, floorDetails } = selectedHostelSelector;
  console.log(selectedHostelSelector);

  const handleBedBook = () => {};

  const dispatch = useDispatch();

  console.log("noOfFloors", selectedHostelSelector.numberOfFloors);

  for (let i = 0; i < selectedHostelSelector.numberOfFloors; i++) {}

  function transformData(roomTypes) {
    return roomTypes.map((roomType) => {
      const { type, numberOfRooms } = roomType;
      const rooms = [];

      for (let i = 1; i <= numberOfRooms; i++) {
        const beds = [
          {
            bedNumber: "",
            status: "",
            bookingId: "",
          },
        ];

        rooms.push({
          roomNumber: i.toString(),
          beds,
        });
      }

      return {
        type,
        noOfRoom: rooms,
      };
    });
  }

  // Example usage
  const originalData = [
    {
      type: "Single",
      price: 7000,
      numberOfRooms: 2,
      selected: true,
      id: 1,
      _id: "655f1cd1ea7129899a27cd21",
    },
    {
      type: "Double",
      price: 6000,
      numberOfRooms: 3,
      selected: true,
      id: 2,
      _id: "655f1cd1ea7129899a27cd22",
    },
    {
      type: "Triple",
      price: 5000,
      numberOfRooms: 5,
      selected: true,
      id: 3,
      _id: "655f1cd1ea7129899a27cd23",
    },
  ];

  const transformedData = transformData(originalData);
  // console.log(transformedData);

  const fetchHostelDetails = async () => {
    setApiStatus(apiStatusConstants.progress);
    try {
      const response = await fetch(`/api/hostel/${id}`);
      if (response.ok) {
        const data = await response.json();

        dispatch(setSelectedHostel(data));
        setApiStatus(apiStatusConstants.success);
      } else {
        const data = await response.json();
        console.log("error", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedHostelSelector.owner) {
      console.log("clicked");
      fetchHostelDetails();
    }
  }, []);

  return (
    <div className="hostel-bed-bg-container">
      <Header />
      <div className="hostel-bed-container-1">
        <h1 className="hostelName-text">{hostelName}</h1>
        {/* <div className="hostel-bed-container">
          {data.map((item) => (
            <div key={item.id} className="room-bed-container">
              <h2 className="room-name">{item.name}</h2>
              <div className="bed-container">
                {item.beds.map((bed) => (
                  <div key={`${item.id}+0${bed.bedNumber}`}>
                    <input
                      type="checkbox"
                      value={bed.status}
                      className="check-box-bed"
                      checked={bed.status}
                      onChange={handleBedBook}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}

        <div className="hostel-bed-container">
          {/* {selectedHostelSelector.floorDetails.map((item) => {
            console.log(item);
            return (
              <div key={item.id} className="room-bed-container">
                <h2 className="room-name">{item.floorNo}</h2>
                <div className="bed-container">
                  {item.types.map((bed, index) => {
                    console.log("bed", bed);
                    return (
                      <div key={index}>
                        <input
                          type="checkbox"
                          value={bed.status}
                          className="check-box-bed"
                          checked={bed.status}
                          onChange={handleBedBook}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })} */}
          <RoomDetails floorDetails={floorDetails} />
        </div>

        <h1 className="hostelName-text">Floor 1</h1>
        <div className="hostel-bed-container">
          {data.map((item) => (
            <div key={item.id} className="room-bed-container">
              <h2 className="room-name">{item.name}</h2>
              <div className="bed-container">
                {item.beds.map((bed) => (
                  <div key={`${item.id}+0${bed.bedNumber}`}>
                    <input
                      type="checkbox"
                      value={bed.status}
                      className="check-box-bed"
                      checked={bed.status}
                      onChange={handleBedBook}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h1 className="hostelName-text">Floor 2</h1>
        <div className="hostel-bed-container">
          {data.map((item) => (
            <div key={item.id} className="room-bed-container">
              <h2 className="room-name">{item.name}</h2>
              <div className="bed-container">
                {item.beds.map((bed) => (
                  <div key={`${item.id}+0${bed.bedNumber}`}>
                    <input
                      type="checkbox"
                      value={bed.status}
                      className="check-box-bed"
                      checked={bed.status}
                      onChange={handleBedBook}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};

export default page;
