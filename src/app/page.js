"use client";

import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";
import "./page.css";
import { useEffect, useState } from "react";

import hostelJson from "@/json/hostelJson";
import HostelItem from "@/components/HostelComponents/HostelItem";

export default function Home() {
  return (
    <main className="home">
      <Header />

      <div className="home-bg-container">
        {hostelJson.map((item) => (
          <HostelItem key={item._id} item={item} />
        ))}
      </div>

      <BottomNavBar />
    </main>
  );
}
