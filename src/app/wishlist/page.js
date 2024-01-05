"use client";

import BottomNavBar from "@/components/BottomNavBar";
import Header from "@/components/Header";
import React from "react";

import "./page.css";
import { useDispatch, useSelector } from "react-redux";
import HostelItem from "@/components/HostelComponents/HostelItem";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishListSlice = useSelector((state) => state.wishListSlice);
  const WishlistEmpty = () => {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <h1 className="empty-wishlist text-black">Your wishlist is empty.</h1>
      </div>
    );
  };

  return (
    <div className="wishlist-bg-container">
      <Header />
      <div className="p-3">
        {wishListSlice.length > 0 ? (
          <>
            {wishListSlice.map((item) => (
              <HostelItem key={item._id} item={item} />
            ))}
          </>
        ) : (
          <WishlistEmpty />
        )}
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Wishlist;
