import React, { useState } from "react";
import storyModelStyles from "./AddStory.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
const AddStoryModal = ({ handleCloseAddStoryModal }) => {
  // const userData = JSON.parse(localStorage.getItem("swipetory_user"));
  const userId = "1";
  const token = "token";
  const [forms, setForms] = useState([
    {
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      userId: userId,
    },
    {
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      userId: userId,
    },
    {
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      userId: userId,
    },
  ]);

  const [error, setError] = useState(false);
  const [currentForm, setCurrentForm] = useState(0);
  const [maxSlides, setMaxSlides] = useState(false);

  const getSelectedClass = (slideId) =>
    currentForm === slideId ? storyModelStyles.selected : "";

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const addForm = () => {
    if (forms.length > 4) {
      setMaxSlides(true);
    } else {
      setMaxSlides(false);
    }
    if (
      forms[currentForm].category &&
      forms[currentForm].heading &&
      forms[currentForm].imageurl &&
      forms[currentForm].description
    ) {
      setForms([
        ...forms,
        {
          heading: "",
          imageurl: "",
          description: "",
          category: "",
          userId: userId,
        },
      ]);
      setCurrentForm(currentForm + 1);
    } else {
      setError(true);
    }
  };
  const handleSelectSlide = (i) => {
    if (
      forms[i].category &&
      forms[i].heading &&
      forms[i].imageurl &&
      forms[i].description
    ) {
      setCurrentForm(i);
      setError(false);
    } else {
      setError(true);
    }
  };
  const removeForm = (index) => {
    if (forms.length > 3) {
      const updatedForms = [...forms];
      updatedForms.splice(index, 1);
      setForms(updatedForms);
    }
  };
  const nextslideHandler = () => {
    if (forms.length > 2 && currentForm <= 1) {
      if (
        forms[currentForm].category &&
        forms[currentForm].heading &&
        forms[currentForm].imageurl &&
        forms[currentForm].description
      ) {
        setCurrentForm(currentForm + 1);
        setError(false);
      } else {
        setError(true);
      }
    }
  };
  const prevSlideHandler = () => {
    if (currentForm > 0) {
      setCurrentForm(currentForm - 1);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (forms.length < 2) {
      setError(true);
      return;
    }

    setError(false);

    toast.loading("loading...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_HOST}/story/create/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ forms }),
        }
      );
      console.log(response);
      if (response.ok) {
        toast.success("Forms submitted successfully");
        handleCloseAddStoryModal();
      } else {
        toast.error("Error submitting forms:");
        console.error("Error submitting forms:", response.status);
      }
    } catch (error) {
      console.error("Error submitting forms:", error);
    }
  };
  return (
    <>
      <div
        className={storyModelStyles.model_wrapper}
        onClick={handleCloseAddStoryModal}
      ></div>
      <Toaster />
      <div className={storyModelStyles.addstory_model}>
        <div className={storyModelStyles.addstory_model_form}>
          <span
            className={storyModelStyles.close_btn}
            onClick={handleCloseAddStoryModal}
          >
            <img src={closeIcon} alt="close" />
          </span>
          <p className={storyModelStyles.warning}>add upto 6 slides</p>
          <div className={storyModelStyles.slidesdiv}>
            {forms?.map((data, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleSelectSlide(i)}
                  className={`${storyModelStyles.slide}  ${getSelectedClass(
                    i
                  )}`}
                >
                  slide
                  {1 + i}
                  <span
                    onClick={removeForm}
                    className={storyModelStyles.cutslide}
                  >
                    <img src={closeIcon} alt="close" />
                  </span>
                </div>
              );
            })}

            <div
              style={{ display: maxSlides ? `none` : `block` }}
              onClick={addForm}
              className={storyModelStyles.addslide}
            >
              Add +
            </div>
          </div>
          <div className={storyModelStyles.form_container}>
            {forms.map((form, index) => (
              <div
                className={`${storyModelStyles.form} `}
                style={{ display: currentForm === index ? "block" : "none" }}
                key={index}
              >
                <h2>Slide {index + 1}</h2>
                <div className={storyModelStyles.input_box}>
                  <label htmlFor="heading">Heading :</label>
                  <input
                    className={storyModelStyles.input}
                    type="text"
                    name="heading"
                    placeholder="Your Heading"
                    onChange={(event) => handleInputChange(event, index)}
                    value={form.heading}
                  />
                </div>
                <div className={storyModelStyles.input_box}>
                  <label htmlFor="description">Description :</label>
                  <textarea
                    className={storyModelStyles.input}
                    type="text"
                    name="description"
                    placeholder="Story description"
                    onChange={(event) => handleInputChange(event, index)}
                    value={form.description}
                  />
                </div>
                <div className={storyModelStyles.input_box}>
                  <label htmlFor="heading">Image :</label>
                  <input
                    className={storyModelStyles.input}
                    type="text"
                    name="imageurl"
                    placeholder="Your Image Url"
                    onChange={(event) => handleInputChange(event, index)}
                    value={form.imageurl}
                  />
                </div>
                <div className={storyModelStyles.input_box}>
                  <label htmlFor="category">Category :</label>
                  <select
                    name="category"
                    id=""
                    className={storyModelStyles.input}
                    onChange={(event) => handleInputChange(event, index)}
                    value={form.category}
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
            ))}
          </div>
          <p className={storyModelStyles.error}>
            {error ? "Please fill all the fields and minimum 3 slides" : ""}
          </p>

          <div className={storyModelStyles.btns}>
            <div className={storyModelStyles.slides_btns}>
              <button
                onClick={prevSlideHandler}
                className={storyModelStyles.modal_preve__btn}
              >
                Previous
              </button>
              <button
                onClick={nextslideHandler}
                className={storyModelStyles.modal_next__btn}
              >
                Next
              </button>
            </div>
            <button
              onClick={handleSubmit}
              className={storyModelStyles.modal_post__btn}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStoryModal;
