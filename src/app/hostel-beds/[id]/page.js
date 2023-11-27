"use client";
import React from "react";

import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";

import "./page.css";
import { useSelector } from "react-redux";

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

const page = (props) => {
  const { id } = props.params;
  const selectedHostelSelector = useSelector((state) => state.selectedHostel);
  const { hostelName, roomTypes } = selectedHostelSelector;

  const handleBedBook = () => {};

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
  console.log(transformedData);

  return (
    <div className="hostel-bed-bg-container">
      <Header />
      <div className="hostel-bed-container-1">
        <h1 className="hostelName-text">{hostelName}</h1>
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
