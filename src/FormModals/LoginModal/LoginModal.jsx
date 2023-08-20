import React, { useState } from "react";
import loginModalStyles from "./LoginModel.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { globleContext } from "../../Store/Context";

const LoginModel = ({ handleCloseLoginModal }) => {
  const { user, setUser } = globleContext();
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.username || !formValue.password) {
      setError(true);
    } else {
      setError(false);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { username, password } = formValue;
        const user = await axios.post(
          `${import.meta.env.VITE_SERVER_HOST}/auth/login`,
          { username, password },
          config
        );
        const { data } = user;
        if (data.status === "success") {
          toast.success("User Login Successfully");
        } else {
          toast.error("Something went wrong");
        }
        setUser(data);
        localStorage.setItem("swipetory_user", JSON.stringify(data));
        setTimeout(() => {
          handleCloseLoginModal();
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div
        className={loginModalStyles.login_model_wrapper}
        onClick={handleCloseLoginModal}
      ></div>
      <Toaster />
      <div className={loginModalStyles.login_model}>
        <div className={loginModalStyles.login_model_form}>
          <span onClick={handleCloseLoginModal}>
            <img src={closeIcon} alt="close" />
          </span>
          <p>Login to SwipTory</p>
          <div className={loginModalStyles.input_box}>
            <label htmlFor="username">Username</label>
            <input
              className={loginModalStyles.input}
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              value={formValue.username}
            />
          </div>
          <div className={loginModalStyles.input_box}>
            <label htmlFor="password">Password</label>
            <input
              className={loginModalStyles.input}
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              value={formValue.password}
            />
          </div>

          <p className={loginModalStyles.error}>
            {error ? "Please enter valid username or password" : ""}
          </p>

          <button
            onClick={handleSubmit}
            className={loginModalStyles.login__btn}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModel;
