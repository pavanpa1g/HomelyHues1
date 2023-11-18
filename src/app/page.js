"use client";

import Header from "@/components/Header";
import BottomNavBar from "@/components/Header/BottomNavBar";
import "./page.css";

export default function Home() {
  return (
    <main className="home">
      <Header />
      <div className="home-con">
        <p>hello</p>
      </div>
      <BottomNavBar />
    </main>
  );
}
