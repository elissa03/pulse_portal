import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import localStorageUtils from "../../utils/localStorageUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "../../services/authService";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaValidated, setCaptchaValidated] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
  };

  const handleLogin = async () => {
    console.log("login")
    setError("");
    try {
      // check if both fields are filled
      if (!email || !password) {
        setError("Email and Password are required.");
        return; // stop the function if validation fails
      }

      // check if the email follows the correct format
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return; // stop the function if validation fails
      }

      if (!captchaValue) {
        setError("Please verify you are not a robot.");
        return; // stop the function if CAPTCHA validation fails
      }

      const response = await authService.login(email, password);
      console.log("login res", response);

      if (response.status === 200) {
        let authenticatedUser = response.data.user[0];
        authenticatedUser.token = response.data.token;
        console.log(authenticatedUser);
        localStorageUtils.setLocalStorageUser(authenticatedUser);
        console.log("Preparing to show success toast");
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 2000, // display for 2 seconds
          onClose: () => {
            // ensure onLogin and navigation occur after the toast
            onLogin();
            reset(); //clear the form fields
            navigate("/dashboard");
          },
        });
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
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className={styles.login_container}>
      <ToastContainer />
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <div className={styles.form_container}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <ReCAPTCHA
              sitekey="6Ldx4zgpAAAAAAKp1pJhbGUAday9dYb9gUGO0a5e"
              onChange={handleCaptcha}
              className={styles.recaptcha}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className={styles.white_btn}
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <img src={logo} className={styles.logo} />
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.green_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
