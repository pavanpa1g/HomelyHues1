import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import "./index.css";

const data = [
  { path: "/", icon: "fa-solid fa-house", name: "Home", id: "home" },
  { path: "/search", icon: "fa-solid fa-magnifying-glass", name: "Explore", id: "explore" },
  { path: "/wishlist", icon: "fa-regular fa-heart", name: "Wish List", id: "wishlist" },
  { path: "/profile", icon: "fa-solid fa-user", name: "Profile", id:"profile" },
];

const BottomNavBar = () => {

    const pathName = usePathname();
   
    return (
        <div className="bottom-con">
            {data.map((eachItem) => (
                <Link key={eachItem.id} href={eachItem.path}>
                    <button type="button" className="nav-item">
                        <i className={`${eachItem.icon} icon ${pathName === eachItem.path}`}></i>
                        <span className="bottom-icon-name">{eachItem.name}</span>
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default BottomNavBar;
