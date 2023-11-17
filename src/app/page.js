"use client";

import { primary, secondary } from "@/utils/constants";
import Header from '@/components/Header'
import BottomNavBar from "@/components/Header/BottomNavBar";
// import { useDispatch, useSelector } from "react-redux";
import './page.css'

export default function Home() {
  // const dispatch = useDispatch();
  // const selector = useSelector((state) => console.log("state", state));
  return (
    <main className="home">
      <Header />
      <div className="home-con">
        <p>
          hello
        </p>
      </div>
      <BottomNavBar />
    </main>
  );
}
