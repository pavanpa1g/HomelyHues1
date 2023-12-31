"use client";

import BottomNavBar from "@/components/BottomNavBar";
import React, { use, useEffect, useState } from "react";
import Modal from "react-modal";
import "./page.css";

const profileImage =
  "https://res.cloudinary.com/dysnxt2oz/image/upload/v1700654131/blank-profile-picture-g65d964fd5_1280-circle-40efe88229e989b9d3162fffd29e3c4d-i62o0qcxhvkd_sje824.png";

const data = [
  {
    id: 1,
    heading: "Username",
    value: "Rahul Attuluri",
  },
  {
    id: 2,
    heading: "Email",
    value: "rahulattuluri@gmail.com",
  },
  {
    id: 3,
    heading: "Phone",
    value: "9912345678",
  },
  {
    id: 4,
    heading: "Date of birth",
    value: "12/12/2012",
  },
  {
    id: 5,
    heading: "Address",
    value: "123 Royal Street, Hyderabad",
  },
];

const ProfileInput = ({ head, value, setter, disabled }) => {
  return (
    <div className="container">
      <h1 className="side-heading">{head}</h1>

      <input
        className="answer"
        type="text"
        onChange={(event) => setter(event.target.value)}
        value={value}
        disabled={disabled}
      />

      <hr className="hr-line" />
    </div>
  );
};

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profileImage);
  const [isUpdating, setIsUpdating] = useState(true);
  // const [userData, setUserData] = useState(data);

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");

  const getUserDataFromLocalStorage = () => {
    const userD = JSON.parse(localStorage.getItem("userData"));

    setUserName(userD.name);
    setEmail(userD.email);
    setSelectedImage(userD.picture);
    setPhone(userD.phone ? userD.phone : "");
    setAddress(userD.address ? userD.address : "");
  };

  useEffect(() => {
    getUserDataFromLocalStorage();
  }, []);

  // const handleInput = (id, event) => {
  //   setUserData((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, value: event.target.value } : item
  //     )
  //   );
  // };

  const handleImageUpload = (event) => {
    // Handle the image upload logic here
    console.log("Image uploaded:", event.target.files);

    const file = event.target.files[0];

    if (file) {
      // Update state with the selected image file
      setIsModalOpen(false);
      setSelectedImage(URL.createObjectURL(file));

      // You can also display a preview of the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        // Display a preview of the selected image
        // You can use e.target.result as the source for an <img> tag
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="profile-bg-container">
        <div className="profile-container">
          {/* <i className="fa-solid fa-arrow-left back-icon"></i> */}
          <h1 className="profile-heading">Edit Profile</h1>
          <div
            className="profile"
            style={{ backgroundImage: `url(${selectedImage})` }}
          >
            <button type="button">
              <i
                onClick={() => setIsModalOpen(true)}
                className="fa-solid fa-camera camera-icon"
              ></i>
            </button>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Image Upload Modal"
            className="modal"
          >
            <h2 className="choose-heading">Choose an Image</h2>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button
              type="button"
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </Modal>
          {/* {userData.map((eachItem) => (
            <div key={eachItem.id} className="container">
              <h1 className="side-heading">{eachItem.heading}</h1>
              {eachItem.heading === "Address" ? (
                <input
                  className="answer"
                  type="text"
                  onChange={(event) => handleInput(eachItem.id, event)}
                  value={eachItem?.value}
                  disabled={isUpdating}
                />
              ) : (
                <input
                  className="answer"
                  type="text"
                  onChange={(event) => handleInput(eachItem.id, event)}
                  value={eachItem?.value}
                  disabled={isUpdating}
                />
              )}
              <hr className="hr-line" />
            </div>
          ))} */}

          <ProfileInput
            head="Username"
            setter={setUserName}
            value={username}
            disabled={isUpdating}
          />
          <ProfileInput
            head="Email"
            setter={setEmail}
            value={email}
            disabled={isUpdating}
          />
          <ProfileInput
            head="Phone"
            setter={setPhone}
            value={phone}
            disabled={isUpdating}
          />
          <ProfileInput
            head="Date of Birth"
            setter={setDateOfBirth}
            value={dateOfBirth}
            disabled={isUpdating}
          />
          <ProfileInput
            head="Address"
            setter={setAddress}
            value={address}
            disabled={isUpdating}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          {isUpdating ? (
            <button
              type="button"
              style={{ marginBottom: "4rem" }}
              className="close-button"
              onClick={() => setIsUpdating(!isUpdating)}
            >
              Update Profile
            </button>
          ) : (
            <button
              type="button"
              style={{ marginBottom: "4rem" }}
              className="close-button"
              onClick={() => setIsUpdating(!isUpdating)}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default Profile;
