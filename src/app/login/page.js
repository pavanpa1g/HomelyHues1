"use client";
import React, { useState } from "react";
import Input from "@/components/InputComponents/Input";
import Link from "next/link";
import "./login.css";
import Image from "next/image";
import apiStatusConstants from "@/utils/apiconstants";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  console.log("errorMsg", errorMsg);

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setApiStatus(apiStatusConstants.progress);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const response = await fetch("/api/login", options);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);

        const { token } = data;
        Cookies.set("jwt_token", token, { expires: 30 });
        localStorage.setItem("userData", JSON.stringify(data));
        setApiStatus(apiStatusConstants.success);
        router.replace("/");
      } else {
        const data = await response.json();
        console.log("error", data.message);
        setErrorMsg(data.message);
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log("error", error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  return (
    <div className="bg-container">
      <form className="card-container" onSubmit={handleLogin}>
        <h1 className="login-heading">Login!</h1>
        {/* <Image src="" width={50} height={50} alt="logo" /> */}
        <Input
          label="Email"
          placeholder="Enter Email"
          type="email"
          value={email}
          handleInputChange={onChangeEmail}
          required={true}
        />
        <Input
          label="Password"
          placeholder="Enter Password"
          type="password"
          value={password}
          handleInputChange={onChangePassword}
          required={true}
        />
        <p className="text-red-500 mt-0 mb-0 text-xs">{errorMsg}</p>
        <button
          className={`login-button
            ${apiStatus == apiStatusConstants.failure && "mt-0"}
          `}
          type="submit"
          disabled={apiStatus === apiStatusConstants.progress}
        >
          Login {apiStatus === apiStatusConstants.progress && "..."}
        </button>
        <p className="forgot-pass">Forgot Password</p>
        <p className="new-user">
          new member?
          <Link href="/signup" className="new-user span-word">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
