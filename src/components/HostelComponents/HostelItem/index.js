import Image from "next/image";
import React, { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdLocationOn, MdFastfood } from "react-icons/md";
import { IoHeartCircle, IoHeartCircleOutline } from "react-icons/io5";
import Link from "next/link";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedHostel } from "@/store/features/selectedHostelSlice";
import { addToWishlist } from "@/store/features/wishListSlice";

const HostelItem = ({ item }) => {
  const { owner, hostelName, address, contactNumber, foodMenu, image } = item;
  const { street, city, district, state, coords } = address;

  const wishlistSlice = useSelector((state) => state.wishListSlice);

  //   href={`/hostel/${item._id}`}

  const dispatch = useDispatch();

  const handleHostel = (e) => {
    if (e.target.closest(".wishlist-container")) {
      dispatch(addToWishlist(item));
      e.preventDefault();
    } else {
      dispatch(setSelectedHostel(item));
    }
  };

  // query: { ...item, ...address, ...coords },
  return (
    <Link
      href={`/hostel/${item._id}`}
      className="hostel-item-bg-container"
      onClick={handleHostel}
    >
      <div className="hostel-item-image-container">
        <Image
          src={image}
          alt={hostelName}
          width={100}
          height={100}
          className="hostel-item-image"
        />
      </div>
      <div className="hostel-item-info-container">
        <h2 className="hostel-name-text">{hostelName}</h2>
        <label className="contact-number-text">
          <MdLocationOn className="location-icon-hostel-item" />
          {`${street}, ${city}, ${district}, ${state}`}
        </label>
        {/* <p className="address-text-para">{`${street}, ${city}, ${district}, ${state}`}</p> */}
        <div className="flex flex-row justify-between">
          <label className="contact-number-text">
            <IoIosCall className="dialer-icon" /> {contactNumber}
          </label>
          <label className="contact-number-text">
            <MdFastfood className="fast-food-icon" /> {foodMenu}
          </label>
        </div>
      </div>
      <button
        className="wishlist-container"
        // onClick={() => setWishListed(!wishListed)}
      >
        {wishlistSlice.some((card) => card._id == item._id) ? (
          <IoHeartCircle className="wishlist-icon " />
        ) : (
          <IoHeartCircleOutline className="wishlist-icon not-select " />
        )}
      </button>
    </Link>
  );
};

export default HostelItem;
