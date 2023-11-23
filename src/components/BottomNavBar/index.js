import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./index.css";

const data = [
  { path: "/", icon: "fa-solid fa-house", name: "Home", id: "home" },
  {
    path: "/explore",
    icon: "fa-solid fa-magnifying-glass",
    name: "Explore",
    id: "explore",
  },
  {
    path: "/wishlist",
    icon: "fa-regular fa-heart",
    name: "Wish List",
    id: "wishlist",
  },
  {
    path: "/profile",
    icon: "fa-solid fa-user",
    name: "Profile",
    id: "profile",
  },
];

const BottomNavBar = () => {
  const pathName = usePathname();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [scrollStyle, setScrollStyle] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollPos > currentScrollPos) {
        // Scrolling up, show the header
        setScrollStyle("animation-close");
      } else {
        // Scrolling down, hide the header
        setScrollStyle("animation-open");
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`bottom-con ${scrollStyle}`}>
      {data.map((eachItem) => (
        <Link
          key={eachItem.id}
          href={eachItem.path}
          className={`${pathName === eachItem.path && "selected-bg"} link-item`}
        >
          <button type="button" className="nav-item">
            <i
              className={`${eachItem.icon} icon ${pathName === eachItem.path}`}
            ></i>
            <span className="bottom-icon-name">{eachItem.name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavBar;
