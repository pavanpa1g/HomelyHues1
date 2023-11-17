"use client";

import { primary, secondary } from "@/utils/constants";
// import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  // const dispatch = useDispatch();
  // const selector = useSelector((state) => console.log("state", state));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p className="text-5xl font-bold text-gray-900 dark:text-white">
          hello
        </p>
      </div>
    </main>
  );
}
