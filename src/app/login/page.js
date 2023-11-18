"use client";
import React, { useState } from "react";
import Input from "@/components/InputComponents/Input";
import Link from "next/link";
import "./login.css";

function login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const onChangeUsername = (value) => {
    setUser(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };
  return (
    <div className="bg-container">
      <div className="card-container">
        <h1 className="login-heading">Login!</h1>
        <img src="" />
        <Input
          label="Username"
          placeholder="Enter Username"
          type="email"
          value={username}
          handleInputChange={onChangeUsername}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={password}
          handleInputChange={onChangePassword}
        />
        <button className="login-button">Login</button>
        <p className="forgot-pass">Forgot Password</p>
        <p className="new-user">
          new member?
          <Link href="/signup" className="new-user span-word">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default login;
