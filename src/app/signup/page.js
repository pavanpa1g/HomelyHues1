"use client";
import React, { useState } from "react";
import Input from "@/components/InputComponents/Input";
import Link from "next/link";
import "./signup.css";

function signup() {
  const [username, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrMsg] = useState(true);
  const handleLogin = (event) => {
    event.preventDefault();
    setErrMsg(!error);
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
          <img src="" />
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
          {error && <p className="error m-0">Error</p>}
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
}

export default signup;
