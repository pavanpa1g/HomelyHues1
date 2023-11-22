"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import "./index.css";
import Header from "@/components/Header";
import apiStatusConstants from "@/utils/apiconstants";
import toast from "react-hot-toast";

const exampleData = [
  { id: 1, value: "Men's Hostel" },
  { id: 2, value: "Women's Hostel" },
  { id: 3, value: "PG Hostel" },
];

const Explore = () => {
  const [search, setSearch] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchList, setSearchList] = useState([]);

  const [animationIndex, setAnimationIndex] = useState(0);

  let intervalId;

  // const updatedValue = () => {
  //   intervalId = setInterval(() => {
  //     if (animationIndex < exampleData.length - 1) {
  //       setAnimationIndex((prevIndex) => prevIndex + 1);
  //     } else {
  //       setAnimationIndex(0);
  //     }
  //   }, 4160);
  // };

  // useEffect(() => {
  //   updatedValue();

  //   return () => clearInterval(intervalId);
  // }, [animationIndex]);

  const handleSearch = async (event) => {
    event.preventDefault();
    setApiStatus(apiStatusConstants.progress);

    try {
      const response = await fetch(`/api/hostel/search?search=${search}`);
      if (response.ok) {
        const data = await response.json();
        setSearchList(data);
        setApiStatus(apiStatusConstants.success);
      } else {
        const data = await response.json();
        toast.error(data.message);
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log("error", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };
  return (
    <div className="explore-bg-container">
      <Header />
      <div className="search-top-container">
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="search"
            value={search}
            className="search-input-search"
            // placeholder="Search Hostels"
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            required
          />
          <button className="search-icon-button" type="submit">
            <FaSearch className="search-icon-search" />
          </button>
          {!search && (
            <label
              className="absolute w-full  top-[20%] label-slide-up-text"
              id="slideset2"
            >
              Try
              {exampleData.map((item) => (
                <label key={item.id}> {item.value}</label>
              ))}
            </label>
          )}
        </form>

        <ul className="search-ul">
          {exampleData.map((item) => (
            <li
              key={item.id}
              className="search-list-item"
              onClick={() => setSearch(item.value)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
