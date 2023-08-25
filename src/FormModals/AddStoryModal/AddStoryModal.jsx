import React, { useState } from "react";
import storyModelStyles from "./AddStory.module.css";
import closeIcon from "../../images/icons8-close-50 (2).png";
import toast, { Toaster } from "react-hot-toast";
import { globleContext } from "../../Store/Context";

const AddStoryModal = ({ handleCloseAddStoryModal }) => {
  const { user } = globleContext();
  const userId = user?.userid;
  const token = user.token;
  const [forms, setForms] = useState([
    {
      userId: userId,
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      likes: [],
    },
    {
      userId: userId,
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      likes: [],
    },
    {
      userId: userId,
      heading: "",
      imageurl: "",
      description: "",
      category: "",
      likes: [],
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
    if (forms.length > 5) {
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
    let formIndex;
    i <= 0 ? (formIndex = forms[i]) : (formIndex = forms[i - 1]);
    if (
      formIndex.category !== "" &&
      formIndex.heading !== "" &&
      formIndex.imageurl !== "" &&
      formIndex.description !== ""
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

    const isFormEmpty = forms.some((form) => {
      return (
        !form.category && !form.heading && !form.imageurl && !form.description
      );
    });

    if (isFormEmpty) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const createUrl = `${
        import.meta.env.VITE_SERVER_HOST
      }/story/create/${userId}`;

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ forms }),
      };

      const response = await fetch(createUrl, requestOptions);
      if (response.ok) {
        toast.success("Forms submitted successfully");
        setTimeout(() => {
          handleCloseAddStoryModal();
        }, 3000);
      } else {
        toast.error("Please fill all the details of at least 3 slides");
      }
    } catch (error) {
      toast.error("Error submitting forms");
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
                    <img
                      style={{ display: forms.length <= 3 ? "none" : "block" }}
                      src={closeIcon}
                      alt="close"
                    />
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
                style={{ display: currentForm === index ? "flex" : "none" }}
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
