import Link from "next/link";
import Popup from "reactjs-popup";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

import "./index.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

const searchDisplayNone = ["/create-hostel", "/explore"];

const Header = () => {
  const pathName = usePathname();
  return (
    <div className="header">
      <div>
        <div className="nav-content">
          <Link href="/">
            <Image
              className="website-logo"
              src="https://previews.123rf.com/images/natka80/natka801604/natka80160400002/55147950-hostel-icon.jpg"
              alt="website logo"
              width={38}
              height={38}
            />
          </Link>
          <Popup
            modal
            trigger={
              <button className="hamburger-icon-button" type="button">
                <GiHamburgerMenu size="30" color="black" />
              </button>
            }
            className="popup-content"
          >
            {(close) => (
              <div className="modal-container">
                <button
                  className="close-button"
                  type="button"
                  onClick={() => close()}
                >
                  <IoMdClose size="30" color="#616e7c" />
                </button>
                <ul className="nav-links-list">
                  <li className="nav-link-item">
                    <Link className="nav-link" href="/" onClick={() => close()}>
                      <AiFillHome size="36" />
                      <p className="nav-link-content">Home</p>
                    </Link>
                  </li>
                  <li className="nav-link-item">
                    <Link
                      className="nav-link"
                      href="/about"
                      onClick={() => close()}
                    >
                      <BsInfoCircleFill size="32" />
                      <p className="nav-link-content">About</p>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </Popup>
        </div>
      </div>
      {!searchDisplayNone.includes(pathName) && (
        <div className="input-container-mobile">
          <input type="search" placeholder="Search" className="search-input" />
          <button type="button" className="search-button">
            <AiOutlineSearch className="search-icon" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
