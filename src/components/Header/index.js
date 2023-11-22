import Link from "next/link";
import Popup from "reactjs-popup";
import { AiOutlineSearch } from "react-icons/ai";
import {FiLogOut}  from "react-icons/fi"

import "./index.css";

const Header = () => {
  const overlayStyles = {
        backgroundColor: "#f5f5f5",
        fontFamily: 'Roboto',
        borderRadius: '8px',
        boxShadow: `2px 2px 5px rgba(0, 0, 0,)`,
        width: '380px',
        height: '180px',
        margin: 'auto',
  }

  const onClickLogout = () => {}

  return (
    <div className="header">
      <div className="nav-content">
        <Link href="/">
          <i className="fa-solid fa-hotel header-icon"></i>
        </Link>
        <Popup
              modal
              overlayStyle={overlayStyles}
              trigger={
                  <button type="button">
                    <FiLogOut className="header-icon" />
                  </button>
              }
            >
              {close => (
                <div className="modal-container">
                  <div className="align-column">
                    <p className="modal-title">
                      Are you sure you want to logout?
                    </p>
                    <div className="align-row">
                      <button
                      className="cancel-button"
                        type="button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <Link href={"/login"}>
                      <button className="confirm-button" type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Popup>   
          </div>

    <div className="input-container-mobile">
      <input type="search" placeholder="Search" className="search-input" />
      <button type="button" className="search-button">
        <AiOutlineSearch className="search-icon" />
      </button>
    </div>
  </div>
);

}
  
export default Header;
