"use client";
import Header from "@/components/Header";
import Input from "@/components/InputComponents/Input";
import { MdMyLocation } from "react-icons/md";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import foodMenuJsonData from "@/json/foodMenuJsonData";
import CustomLoader from "@/components/Loaders/CustomLoader/CustomLoader";

import "./hostel.css";
import apiStatusConstants from "@/utils/apiconstants";
import { useRouter } from "next/navigation";

const roomTypesData = [
  {
    id: 1,
    type: "Single",
    price: 0,
    numberOfRooms: 0,
    selected: false,
  },
  {
    id: 2,
    type: "Double",
    price: 0,
    numberOfRooms: 0,
    selected: false,
  },
  {
    id: 3,
    type: "Triple",
    price: 0,
    numberOfRooms: 0,
    selected: false,
  },
  {
    id: 4,
    type: "Four",
    price: 0,
    numberOfRooms: 0,
    selected: false,
  },
  {
    id: 5,
    type: "Five",
    price: 0,
    numberOfRooms: 0,
    selected: false,
  },
];

const CreateHostel = () => {
  const [hostelName, setHostelName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [location, setLocation] = useState(null);
  const [foodMenu, setFoodMenu] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMsg, setErrorMsg] = useState("");
  const [image, setImage] = useState(
    "https://q-xx.bstatic.com/xdata/images/hotel/max750/80023444.jpg?k=75698131061da0dc34c3de55e128bcd8477c5ffff63bb443b8655dace6caf58e&o="
  );
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [roomTypesAndPrice, setRoomTypesAndPrice] = useState(roomTypesData);
  const [numberOfFloors, setNumberOfFloors] = useState(0);
  const [floorSharing, setFloorSharing] = useState([]);

  const router = useRouter();

  const getCoordinates = () => {
    setAddressLoading(true);
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((permissionStatus) => {
          if (permissionStatus.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("Geolocation success:", position);
                const { latitude, longitude } = position.coords;
                Cookies.set("coords", { latitude, longitude });
                setLocation({ latitude, longitude });
              },
              (error) => {
                console.log("Geolocation error:", error);
              }
            );
          } else if (permissionStatus.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("Geolocation success:", position);
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
              },
              (error) => {
                console.log("Geolocation error:", error);
              }
            );
          } else {
            console.log("Geolocation permission denied.");
          }
        })
        .catch((error) => {
          console.log("Geolocation permission error:", error);
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (location) {
      getAddress();
    }
  }, [location]);

  const getAddress = async () => {
    try {
      // const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`;
      const apiUrl = `https://geocode.maps.co/reverse?lat=${location.latitude}&lon=${location.longitude}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch address. Status: ${response.status}`);
      }

      const data = await response.json();
      const { address } = data;
      const { county, residential, suburb, state, state_district, postcode } =
        address;

      setStreet(
        `${residential !== undefined ? residential : ""} ${suburb && suburb}`
      );
      setCity(county && county);
      setState(state);
      setDistrict(state_district);
      setPostalCode(postcode);
    } catch (error) {
      console.error("Error fetching address:", error);
    } finally {
      setAddressLoading(false);
    }
    setAddressLoading(false);
  };

  const handleSubmit = async (event) => {
    setApiStatus(apiStatusConstants.progress);
    //TODO: Validate form before submit
    event.preventDefault();
    const address = {
      street,
      city,
      district,
      postalCode,
      district,
      coordinates: location,
    };
    const token = Cookies.get("userId");

    const newRoomTypes = roomTypesAndPrice
      .filter((item) => item.selected)
      .map((item) => ({
        type: item.type,
        price: parseInt(item.price, 10),
        numberOfRooms: parseInt(item.numberOfRooms, 10),
        selected: item.selected,
        id: item.id,
      }));
    const hostelData = {
      owner: "65589ca5c763a88b9cc4329f", //replace userId stored in the cookies
      hostelName,
      address,
      foodMenu,
      contactNumber: contactNumber,
      image,
      numberOfRooms: parseInt(numberOfRooms),
      roomTypes: newRoomTypes,
      numberOfFloors,
      floorDetails: floorSharing,
    };

    console.log("hostelData", hostelData);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostelData }),
    };
    try {
      const response = await fetch("/api/hostel", options);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        // localStorage.setItem("hostel_data", data);
        // setApiStatus(apiStatusConstants.success);
        // toast.success("Successfully toasted!");
        // router.back();
      } else {
        const data = await response.json();
        setErrorMsg(data.message);
        console.log("data,", data);
        setApiStatus(apiStatusConstants.failure);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      setApiStatus(apiStatusConstants.failure);
      toast.error("Something Went Wrong!");
    }
  };

  const handleCheckBox = (id) => {
    setRoomTypesAndPrice((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected, price: 0, numberOfRooms: 0 }
          : item
      )
    );

    setFloorSharing((prevFloorsData) => {
      const updatedFloorsData = prevFloorsData.map((floor) => ({
        ...floor,
        roomTypes: floor.roomTypes.map((roomType) => ({
          ...roomType,
          selected: roomType.id === id ? !roomType.selected : roomType.selected,
          // Update condition as per your requirements
        })),
      }));
      return updatedFloorsData;
    });
  };

  const handlePrice = (id, event) => {
    setRoomTypesAndPrice((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, price: event.target.value } : item
      );
    });
  };

  const handleNoOfRooms = (id, event) => {
    setRoomTypesAndPrice((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, numberOfRooms: event.target.value } : item
      );
    });
  };

  const totalNoOfRoomTypes = roomTypesAndPrice.reduce(
    (prev, current) =>
      current.selected ? prev + parseInt(current.numberOfRooms, 10) : prev,
    0
  );

  function generateRoomDocuments(originalData) {
    const roomsArray = [];
    originalData.map((item) =>
      item.roomTypes.map((type) => {
        if (type.selected && type.type === "Single") {
          for (let i = 0; i < type.numberOfRooms; i++) {
            let newItem = {
              hostel: "123",
              roomNumber: parseInt(`${item.floorNumber}0${i + 1}`),
              capacity: type.id,
              price: 1000,
              occupiedBy: [],
              floorNumber: item.floorNumber,
            };
            roomsArray.push(newItem);
          }
        }
      })
    );
    return roomsArray;
  }

  console.log("roomsArray", generateRoomDocuments(floorSharing));

  const numberOfRoomsEqualToTotalTypesOfRooms =
    parseInt(numberOfRooms) === totalNoOfRoomTypes;

  const handleSettingNumberOfFloors = (text) => {
    const newNumber = parseInt(text, 10) || 0;
    setNumberOfFloors(newNumber);

    const newFloorData = Array.from({ length: newNumber }, (_, index) => ({
      floorNumber: index + 1,
      roomTypes: [
        {
          type: "Single",
          numberOfRooms: 0,
          id: 1,
          selected: roomTypesAndPrice[0].selected,
        },
        {
          type: "Double",
          numberOfRooms: 0,
          id: 2,
          selected: roomTypesAndPrice[1].selected,
        },
        {
          type: "Triple",
          numberOfRooms: 0,
          id: 3,
          selected: roomTypesAndPrice[2].selected,
        },
        {
          type: "Four",
          numberOfRooms: 0,
          id: 4,
          selected: roomTypesAndPrice[3].selected,
        },
      ],
    }));

    setFloorSharing(newFloorData);
  };

  console.log("floorSharing", floorSharing);

  const handleFloorDetails = (value, floorNumber, roomItem) => {
    // console.log("text", value);
    setFloorSharing((prev) => {
      return prev.map((floor) => {
        if (floor.floorNumber === floorNumber) {
          return {
            ...floor,
            roomTypes: floor.roomTypes.map((type) =>
              type.type === roomItem.type
                ? { ...type, numberOfRooms: value }
                : type
            ),
          };
        } else {
          return floor;
        }
      });
    });
  };

  return (
    <div className="min-h-screen  bg-white">
      <Header />

      <div className="hostel-bg-container">
        <h1 className="hostel-head">Fill the Hostel Details</h1>
        <form className="hostel-form" onSubmit={handleSubmit}>
          <Input
            label="Hostel Name"
            type="text"
            placeholder="Enter Hostel Name..."
            value={hostelName}
            handleInputChange={setHostelName}
            fullBorder={true}
            required={true}
          />
          <Input
            label="Phone Number"
            type="numeric"
            placeholder="Enter Phone Number"
            value={contactNumber}
            handleInputChange={setContactNumber}
            fullBorder={true}
            required={true}
          />

          <input type="file" />
          <div className="flex justify-between">
            <h2 className="address-text">Address</h2>
            <button
              className="location-container"
              type="button"
              onClick={getCoordinates}
              disabled={addressLoading}
            >
              {addressLoading ? (
                <CustomLoader />
              ) : (
                <MdMyLocation className="location-icon" size={24} />
              )}
            </button>
          </div>

          <Input
            label="Street"
            type="text"
            placeholder="Enter Street"
            value={street}
            handleInputChange={setStreet}
            fullBorder={true}
            required={true}
          />

          <Input
            label="City"
            type="text"
            placeholder="Enter City"
            value={city}
            handleInputChange={setCity}
            fullBorder={true}
            required={true}
          />
          <Input
            label="District"
            type="text"
            placeholder="Enter District"
            value={district}
            handleInputChange={setDistrict}
            fullBorder={true}
            required={true}
          />
          <Input
            label="State"
            type="text"
            placeholder="Enter State"
            value={state}
            handleInputChange={setState}
            fullBorder={true}
            required={true}
          />

          <Input
            label="Pin Code"
            type="numeric"
            placeholder="Enter Street"
            value={postalCode}
            handleInputChange={setPostalCode}
            fullBorder={true}
            required={true}
          />

          <label className="label-name">Food Menu</label>
          <div
            className={`flex items-center p-2 pl-0 mb-4 ${
              apiStatus === apiStatusConstants.failure &&
              "food-menu-margin-bottom"
            }`}
          >
            {foodMenuJsonData.map((item) => (
              <div key={item.id}>
                <input
                  key={item.id}
                  type="radio"
                  name={item.name}
                  className="radio-input"
                  value={item.label}
                  onChange={(e) => setFoodMenu(e.target.value)}
                  id={item.id}
                  required={true}
                />
                <label className="text-black food-label" htmlFor={item.id}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          <h2 className="address-text mb-2">Rooms Details</h2>
          <Input
            label="Number of Rooms"
            placeholder="Enter Number of Rooms"
            value={numberOfRooms === 0 ? "" : numberOfRooms}
            handleInputChange={setNumberOfRooms}
            fullBorder={true}
            type="number"
            required={true}
          />

          <label htmlFor={"room types"} className="label-name">
            Room Types
          </label>
          <div className="flex  justify-between pl-4 mb-2">
            <p className="text-black room-type-text">Type</p>
            <p className="text-black  price-text-width">Price/month</p>
            <p className="text-black no-of-rooms-text-width">No of Rooms</p>
          </div>
          <div>
            {roomTypesAndPrice.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2 items-center"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  value={item.selected}
                  checked={item.selected}
                  onChange={() => handleCheckBox(item.id)}
                  className="checkbox"
                />
                <label
                  htmlFor={item.id}
                  className={`room-type-text ${
                    item.selected && "selected-text"
                  }`}
                >
                  {item.type}
                  {" bed"}
                </label>
                <input
                  type="number"
                  value={item.price === 0 ? "" : item.price}
                  onChange={(event) => handlePrice(item.id, event)}
                  className={`input-room-price mr-1 ${
                    item.selected && "selected"
                  }`}
                  placeholder="₹ Price"
                  disabled={!item.selected}
                  required={item.selected}
                  min={0}
                />
                <input
                  type="number"
                  value={item.numberOfRooms === 0 ? "" : item.numberOfRooms}
                  // onChange={() => console.log(item.type)}
                  min={0}
                  className={`input-no-of-rooms ${
                    item.selected && "selected"
                  }  ${
                    item.selected &&
                    parseInt(numberOfRooms) > totalNoOfRoomTypes &&
                    "orange-border"
                  } ${
                    item.selected &&
                    parseInt(numberOfRooms) < totalNoOfRoomTypes &&
                    "red-border"
                  } ${
                    item.selected &&
                    numberOfRoomsEqualToTotalTypesOfRooms &&
                    "green-border"
                  }`}
                  placeholder="No of Rooms"
                  onChange={(event) => handleNoOfRooms(item.id, event)}
                  disabled={!item.selected}
                  required={item.selected}
                />
              </div>
            ))}
          </div>

          <h2 className="address-text mb-2">Floor Details</h2>
          <Input
            label="Number of Floor"
            placeholder="Enter Number of Floors"
            value={numberOfFloors === 0 ? "" : numberOfFloors}
            // handleInputChange={setNumberOfFloors}
            handleInputChange={handleSettingNumberOfFloors}
            fullBorder={true}
            type="number"
            required={true}
          />

          {floorSharing.map(
            (item, index) =>
              (roomTypesAndPrice[0].selected ||
                roomTypesAndPrice[1].selected ||
                roomTypesAndPrice[2].selected ||
                roomTypesAndPrice[3].selected) && (
                <>
                  <h1 key={index} className="text-black">
                    floor {item.floorNumber}
                  </h1>
                  <div>
                    {item.roomTypes.map((roomItem, twoindex) => {
                      return (
                        roomItem.selected && (
                          <div key={roomItem.floorNumber} className="flex">
                            <p className="text-black room-type-text">
                              {roomItem.type}
                            </p>
                            <input
                              type="number"
                              // value={numberOfFloors === 0 ? "" : numberOfFloors}
                              onChange={(event) =>
                                handleFloorDetails(
                                  parseInt(event.target.value),
                                  item.floorNumber,
                                  roomItem
                                )
                              }
                              className={`input-room-price mr-1 `}
                              placeholder="no of room"
                              // disabled={!item.selected}
                              // required={item.selected}
                              min={0}
                            />
                          </div>
                        )
                      );
                    })}
                  </div>
                </>
              )
          )}

          {apiStatus === apiStatusConstants.failure && (
            <p className="hostel-err-msg">* {errorMsg}</p>
          )}

          <button className="submit" type="submit">
            {apiStatus === apiStatusConstants.progress ? (
              <CustomLoader />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateHostel;
