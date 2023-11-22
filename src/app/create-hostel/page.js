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
  const [image, setImage] = useState("");

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
    const hostelData = {
      ownerId: "65589cc4c763a88b9cc432a3", //replace userId stored in the cookies
      hostelName,
      address,
      foodMenu,
      contactNumber: contactNumber,
      image,
    };

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
        localStorage.setItem("hostel_data", data);
        setApiStatus(apiStatusConstants.success);
        toast.success("Successfully toasted!");
        router.back();
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
