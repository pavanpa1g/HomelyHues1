"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";
import React from "react";

import "./page.css";

const Wishlist = () => {
  return (
    <div className="wishlist-bg-container">
      <Header />
      <p>Wishlist</p>
      <BottomNavBar />
    </div>
  );
};

export default Wishlist;
