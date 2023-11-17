// const Header = () =>  {
//     return <div className="icons-con">
//         <img src="https://static.vecteezy.com/system/resources/thumbnails/016/446/727/small/hostel-icon-free-vechrr.jpg" className="header-icon" alt="header-icon" />
//     <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-45/hamburger-menu-5.png" className="hamburger-icon" alt="hamburger-icon" />
// </div>
// }

import Link from 'next/Link'
import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'
import {BsInfoCircleFill} from 'react-icons/bs'
import {AiOutlineSearch} from 'react-icons/ai'

import './index.css'

const Header = () => (
    <div className="header">
  <div>
    <div className="nav-content">
      <Link href="/">
        <img
          className="website-logo"
          src="https://previews.123rf.com/images/natka80/natka801604/natka80160400002/55147950-hostel-icon.jpg"
          alt="website logo"
        />
      </Link>
      <Popup
        modal
        trigger={
          <button
            className="hamburger-icon-button"
            type="button"
          >
            <GiHamburgerMenu size="30" />
          </button>
        }
        className="popup-content"
      >
        {close => (
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
                <Link className="nav-link" href="/about" onClick={() => close()}>
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
  <div className="input-container-mobile">
    <input
    type="search"
    placeholder="Search"
    className="search-input"
    />
    <button
    type="button"
    className="search-button"
    >
    <AiOutlineSearch className="search-icon" />
    </button>
</div>
</div>
)

export default Header