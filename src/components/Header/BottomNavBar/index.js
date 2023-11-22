import Link from "next/link";
import React from "react";
import "./index.css";
import { usePathname } from "next/navigation";

const data = [
  { path: "/", icon: "fa-solid fa-house", name: "Home" },
  { path: "/explore", icon: "fa-solid fa-magnifying-glass", name: "Explore" },
  { path: "/wishlist", icon: "fa-regular fa-heart", name: "Wish List" },
  { path: "/profile", icon: "fa-solid fa-user", name: "Profile" },
];

const BottomNavBar = () => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div>
      {data.map((eachItem) => (
        <Link key={eachItem.name} href={eachItem.path}>
          <div className="nav-item">
            <i className={eachItem.icon}></i>
            <span>{eachItem.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavBar;
