"use client";

import Header from "@/components/Header";

import React, { useEffect, useState } from "react";

import "./hostelpage.css";
import Image from "next/image";
import { MdFastfood, MdLocationOn } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedHostel } from "@/store/features/selectedHostelSlice";
import apiStatusConstants from "@/utils/apiconstants";
import HostelDetailsLoader from "@/components/Loaders/HostelDetailsLoader.js/HostelDetailsLoader";
import FailureView from "@/components/FailureView/FailureView";

import { IoBedOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const HostelDetailsPage = (props) => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const id = props.params.id;

  const selectedHostelSelector = useSelector((state) => state.selectedHostel);
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    owner,
    image,
    address,
    foodMenu,
    contactNumber,
    hostelName,
    numberOfRooms,
    roomTypes,
  } = selectedHostelSelector;

  const { city, coords, district, postalCode, state, street } = address;

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
        console.log(data.message);
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log("error", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    console.log("selectedHostelSelector", selectedHostelSelector.owner);
    if (selectedHostelSelector.owner === "") {
      fetchHostelDetails();
    }
  }, []);

  const handleBeds = () => {
    toast.success("Successfully Booked a Bed!");
    // router.push(`/hostel-beds/${id}`);
  };

  const renderFailure = () => {
    return (
      <div>
        <FailureView retryFetch={fetchHostelDetails} />
      </div>
    );
  };

  const renderProgress = () => {
    return <HostelDetailsLoader />;
  };

  const renderSuccess = () => {
    return (
      <div className="hostel-page-container">
        <Image
          src={image}
          alt={hostelName}
          className="hostel-page-image"
          width={200}
          height={200}
        />
        <div>
          <h1 className="hostel-page-name color-text">{hostelName}</h1>
          <h2 className="color-text address-text">Address</h2>
          <div className="hostel-page-icon-text-container">
            <MdLocationOn className="location-icon icon-hostel-page" />
            <p className="color-text">
              {`${street}, ${city}, ${district}, ${state},${postalCode}`}
            </p>
          </div>

          <h2 className="color-text address-text">Contact</h2>
          <div className="hostel-page-icon-text-container">
            <IoIosCall className="dialer-icon icon-hostel-page" />
            <p className="color-text">{contactNumber} </p>
          </div>
          <h2 className="address-text color-text">Food Menu:</h2>
          <div className="hostel-page-icon-text-container">
            <MdFastfood className="fast-food-icon icon-hostel-page" />
            <p className="color-text">{foodMenu} </p>
          </div>
          <h2 className="address-text color-text">Room Types</h2>

          {roomTypes.map((item) => (
            <div
              className="hostel-page-icon-text-container room-types-cont"
              key={item.id}
            >
              <p className="color-text">
                {item.type}
                {" Sharing"}
              </p>
              <IoBedOutline className="bed-icon" />
              <p className="color-text ml-auto price-text">
                {" ₹"}
                {item.price}
              </p>
              <p className="color-text ">/month</p>
            </div>
          ))}
          <div className="flex gap-2">
            <h2 className="address-text color-text">Total No of Rooms:-</h2>
            <h2 className="address-text  number-color">
              {numberOfRooms}/{numberOfRooms}
            </h2>
          </div>
          {roomTypes.map((item) => (
            <div
              className="hostel-page-icon-text-container room-types-cont"
              key={item.id}
            >
              <p className="color-text">
                {item.type}
                {" Sharing"}
              </p>
              <IoBedOutline className="bed-icon" />
              <p className="color-text ml-auto price-text">
                {item.numberOfRooms}/{item.numberOfRooms}
              </p>
            </div>
          ))}

          <button className="book-bed-button" onClick={handleBeds}>
            Book a bed
          </button>
        </div>
      </div>
    );
  };
  const renderHostelDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccess();
      case apiStatusConstants.progress:
        return renderProgress();
      case apiStatusConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };
  return (
    <div className="hostel-page-bg-container">
      <Header />
      {selectedHostelSelector.owner !== ""
        ? renderSuccess()
        : renderHostelDetails()}
    </div>
  );
};

export default HostelDetailsPage;
