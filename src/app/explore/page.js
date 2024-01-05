"use client";

import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import "./index.css";
import Header from "@/components/Header";
import apiStatusConstants from "@/utils/apiconstants";
import toast from "react-hot-toast";
import BottomNavBar from "@/components/BottomNavBar";
import hostelJson from "@/json/hostelJson";
import HostelItem from "@/components/HostelComponents/HostelItem";

const exampleData = [
  { id: 1, value: "Men's Hostel" },
  { id: 2, value: "Women's Hostel" },
  { id: 3, value: "PG Hostel" },
];

const Results = ({ searchResults }) => {
  console.log(searchResults);
  return (
    <div className="mt-3">
      {searchResults.map((item) => (
        <HostelItem key={item._id} item={item} />
      ))}
    </div>
  );
};

const Explore = () => {
  const [search, setSearch] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchList, setSearchList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    // event.preventDefault();
    if (!search) return;

    const result = hostelJson.filter((item) =>
      item.hostelName.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(result);
    return;
    setApiStatus(apiStatusConstants.progress);

    try {
      const response = await fetch(`/api/hostel/search?search=${search}`);
      if (response.ok) {
        const data = await response.json();
        console.log("search results", data);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="explore-bg-container">
      <Header />
      <div className="search-top-container">
        <div className="search-container">
          <input
            type="search"
            value={search}
            className="search-input-search"
            // placeholder="Search Hostels"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
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
        </div>

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

        <Results searchResults={searchResults} />
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Explore;
