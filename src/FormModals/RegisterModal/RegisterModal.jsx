import React, { useState } from "react";
import styles from "./RegisterModel.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { globleContext } from "../../Store/Context";

const RegisterModel = ({ handleCloseRegisterModal }) => {
  const { setUser, isLoading, setIsLoading } = globleContext();
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
    setIsLoading(true);

    const { username, password } = formValue;
    if (!username || !password) {
      setError(true);
      return;
    }
    setError(false);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_HOST}/auth/register`,
        { username, password },
        config
      );

      const { data } = response;

      if (data.status === "success") {
        toast.success("User Registered Successfully");
        setUser(data);
        setIsLoading(false);
        localStorage.setItem("swipetory_user", JSON.stringify(data));
      } else {
        toast.error("Something went wrong");
      }

      setTimeout(() => {
        handleCloseRegisterModal();
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={styles.register_model_wrapper}
        onClick={handleCloseRegisterModal}
      ></div>
      <Toaster />
      <div className={styles.register_model}>
        <div className={styles.register_model_form}>
          <span onClick={handleCloseRegisterModal}>
            <img src={closeIcon} alt="close" />
          </span>
          <p>Register to SwipTory</p>
          <div className={styles.input_box}>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={handleChange}
              value={formValue.username}
            />
          </div>

          <div className={styles.input_box}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formValue.password}
            />
          </div>
          <p className={styles.error}>
            {error ? "* all fields required in the form" : ""}
          </p>
          <button
            style={{
              backgroundColor: isLoading ? "#b3d2ff" : "#73abff",
              pointerEvents: isLoading ? "none" : "auto",
            }}
            onClick={handleSubmit}
            className={styles.signup_model_btn}
          >
            {isLoading ? "loading..." : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterModel;
