"use client";

import Header from "@/components/Header";

import React, { useEffect } from "react";

import "./hostelpage.css";
import Image from "next/image";
import { MdFastfood, MdLocationOn } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { useSelector } from "react-redux";

const HostelDetailsPage = (props) => {
  const id = props.params.id;

  const { searchParams } = props;

  const {
    address,
    contactNumber,
    foodMenu,
    hostelName,
    image,
    owner,
    street,
    state,
    city,
    district,
    postalCode,
  } = searchParams;

  const selectedHostelSelector = useSelector((state) => state.selectedHostel);

  const fetchHostelDetails = (hostel) => {
    return;
  };

  useEffect(() => {
    if (!selectedHostelSelector) {
      fetchHostelDetails();
    }
  }, []);

  return (
    <div className="hostel-page-bg-container">
      <Header />
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
        </div>
      </div>
    </div>
  );
};

export default HostelDetailsPage;
