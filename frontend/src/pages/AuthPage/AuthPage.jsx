import React, { useState } from "react";
import { useNavigate } from "react-router";
import Image from "../../components/Image/Image";
import "./AuthPage.css";
import apiRequest from "../../utils/apiRequests";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../../utils/authStore";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await apiRequest.post(
        `users/auth/${isRegister ? "register" : "login"}`,
        data,
        { withCredentials: true }
      );

      console.log("User Info:", res.data);
      setCurrentUser(res.data);

      toast.success(`${isRegister ? "Registered" : "Logged in"} successfully!`);
      form.reset();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="authPage">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="authContainer w-96">
        <Image path="/general/logo.png" w={36} h={36} alt="" />
        <h1>
          {isRegister ? "Register a New Account" : "Login to your Account"}
        </h1>
        {isRegister ? (
          <form key="register" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                placeholder="Username"
                required
                name="userName"
                id="userName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="displayName">Name</label>
              <input
                type="text"
                placeholder="Name"
                required
                name="displayName"
                id="displayName"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Register</button>
            <p onClick={() => setIsRegister(false)}>
              Already have an account? <b>Login</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        ) : (
          <form key="loginForm" onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                id="email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                id="password"
              />
            </div>
            <button type="submit">Login</button>
            <p onClick={() => setIsRegister(true)}>
              Don&apos;t have an account? <b>Register</b>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
