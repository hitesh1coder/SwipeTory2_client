import React, { useState, useEffect } from "react";
import storyModelStyles from "../AddStoryModal/AddStory.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UpdateStoryModal = ({ handleCloseUpdateStoryModal, storyData }) => {
  const [formValue, setFormValue] = useState({
    heading: storyData.heading,
    imageurl: storyData.imageurl,
    description: storyData.description,
    category: storyData.category,
    userId: storyData.userId,
  });
  const [error, setError] = useState(false);
  const storyId = storyData._id;

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const { heading, category, imageurl, description, userId } = formValue;

    if (!heading && !imageurl && !description && !category) {
      setError(true);
    } else {
      setError(false);

      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };

        const updatedJob = await axios.put(
          `${import.meta.env.VITE_SERVER_HOST}/story/update/${storyId}`,
          { heading, category, imageurl, description, userId },
          config
        );

        if (updatedJob.status === 200) {
          toast.success(" story updated Successfully");
        } else {
          toast.error(" story not updated ");
        }
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      handleCloseUpdateStoryModal();
    }, 3000);
  };

  return (
    <>
      <div
        className={storyModelStyles.model_wrapper}
        onClick={handleCloseUpdateStoryModal}
      ></div>
      <Toaster />
      <div className={storyModelStyles.addstory_model}>
        <div className={storyModelStyles.addstory_model_form}>
          <span
            className={storyModelStyles.close_btn}
            onClick={handleCloseUpdateStoryModal}
          >
            <img src={closeIcon} alt="close" />
          </span>

          <div className={storyModelStyles.form_container}>
            <div className={`${storyModelStyles.form} `}>
              <h2>UpDate This Story</h2>
              <div className={storyModelStyles.input_box}>
                <label htmlFor="heading">Heading :</label>
                <input
                  className={storyModelStyles.input}
                  type="text"
                  name="heading"
                  placeholder="Your Heading"
                  onChange={handleChange}
                  value={formValue.heading}
                />
              </div>
              <div className={storyModelStyles.input_box}>
                <label htmlFor="description">Description :</label>
                <textarea
                  className={storyModelStyles.input}
                  type="text"
                  name="description"
                  placeholder="Story description"
                  onChange={handleChange}
                  value={formValue.description}
                />
              </div>
              <div className={storyModelStyles.input_box}>
                <label htmlFor="heading">Image :</label>
                <input
                  className={storyModelStyles.input}
                  type="text"
                  name="imageurl"
                  placeholder="Your Image Url"
                  onChange={handleChange}
                  value={formValue.imageurl}
                />
              </div>
              <div className={storyModelStyles.input_box}>
                <label htmlFor="category">Category :</label>
                <select
                  name="category"
                  id=""
                  className={storyModelStyles.input}
                  onChange={handleChange}
                  value={formValue.category}
                >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="health_fitness">Health and Fitness</option>
                  <option value="travel">Travel</option>
                  <option value="movie">Movie</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </div>
          </div>
          <p className={storyModelStyles.error}>
            {error ? "Please fill all the fields and minimum 3 slides" : ""}
          </p>

          <div className={storyModelStyles.btns}>
            <div className={storyModelStyles.slides_btns}>
              <button
                // onClick={prevSlideHandler}
                className={storyModelStyles.modal_preve__btn}
              >
                Previous
              </button>
              <button
                // onClick={nextslideHandler}
                className={storyModelStyles.modal_next__btn}
              >
                Next
              </button>
            </div>
            <button
              onClick={handleUpdate}
              className={storyModelStyles.modal_post__btn}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStoryModal;
