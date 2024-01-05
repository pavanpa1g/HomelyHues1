"use client";
import React, { useState } from "react";
import Input from "@/components/InputComponents/Input";
import Link from "next/link";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterThunk } from "@/store/features/userSlice";
import apiStatusConstants from "@/utils/apiconstants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      name: username,
      email,
      phoneNumber: mobileNum,
      password,
      role: false,
    };

    const url = "/api/register";

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();

        Cookies.set("jwt_token", data.token, { expires: 30 });
        localStorage.setItem("userData", JSON.stringify(data));
        toast.success("Successfully Signed Up!");
        router.replace("/");
      } else {
        const data = await response.json();
        toast.error(data.message);
        console.log(response);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const onChangeUsername = (value) => {
    setUser(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };
  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangeNumber = (value) => {
    setMobileNum(value);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="bg-container">
        <div className="card-container">
          <h1 className="login-heading">Sign Up!</h1>
          {/* <Image src="" /> */}
          <Input
            label="Username"
            placeholder="Enter Username"
            type="text"
            value={username}
            handleInputChange={onChangeUsername}
            required={true}
          />
          <Input
            label="Email"
            placeholder="Enter Email"
            type="email"
            value={email}
            handleInputChange={onChangeEmail}
            required={true}
          />
          <Input
            label="Mobile Number"
            placeholder="mobile-number"
            type="numeric"
            value={mobileNum}
            handleInputChange={onChangeNumber}
            required={false}
          />
          <Input
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            handleInputChange={onChangePassword}
            required={true}
          />
          <input type="radio" id="provider" name="type" required />
          <label htmlFor="provider" className="label-radio">
            Provider
          </label>
          <input type="radio" id="user" name="type" required />
          <label htmlFor="user">User</label>
          {error && <p className="error m-0">{error}</p>}
          <button className={`login-button ${error && "error-msg"}`}>
            Sign Up
          </button>
          <p className="forgot-pass">Forgot Password</p>
          <p className="new-user">
            have account?
            <Link href="/login" className="new-user span-word">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
