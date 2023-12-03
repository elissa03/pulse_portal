import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/authService";


const Signup = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async () => {
    setError(""); //clear any existing errors
    try {
      if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.confirm_password
      ) {
        setError("Please fill in all fields.");
        return;
      }
      if (!emailRegex.test(data.email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (data.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }
      const response = await authService.signup({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });
      if (response.status === 201) {
        toast.success("Account successfully created!", {
          position: "top-center",
          autoClose: 2000,
          onClose: () => navigate("/"), // Redirect after the toast message
        });
        reset();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const reset = () => {
    setData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
    setError("");
  };

  return (
    <div className={styles.signup_container}>
      <ToastContainer />
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <img src={logo} className={styles.logo} />
          <h1>Welcome Back</h1>
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.form_container}>
            <h1>Create Account</h1>
            <input
              placeholder="First Name"
              name="first_name"
              required
              className={styles.input}
              onChange={(e) => setData({ ...data, first_name: e.target.value })}
              value={data.first_name}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              required
              className={styles.input}
              onChange={(e) => setData({ ...data, last_name: e.target.value })}
              value={data.last_name}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className={styles.input}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className={styles.input}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              required
              className={styles.input}
              onChange={(e) =>
                setData({ ...data, confirm_password: e.target.value })
              }
              value={data.confirm_password}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button className={styles.green_btn} onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
