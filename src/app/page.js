"use client";

import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";

import { useEffect, useState } from "react";

import hostelJson from "@/json/hostelJson";
import HostelItem from "@/components/HostelComponents/HostelItem";

import "./page.css";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // You can add additional logic here, such as previewing the selected image.
  };

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
