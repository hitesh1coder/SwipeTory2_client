import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Header from "../Components/Header/Header";
import Categories from "../Components/SelectCategories/Categories";
import AllStories from "../Components/StoriesSection/AllStories";
import { categoriesData } from "../Components/SelectCategories/CategoryData";
import MyStories from "../Components/StoriesSection/MyStories";
import BookmarkStories from "../Components/StoriesSection/BookmarkStories";
import RegisterModal from "../FormModals/RegisterModal/RegisterModal";
import LoginModal from "../FormModals/LoginModal/LoginModal";
import AddStoryModal from "../FormModals/AddStoryModal/AddStoryModal";
import { globleContext } from "../Store/Context";
import axios from "axios";

const Home = () => {
  // Get the necessary data and functions from the global context
  const {
    user,
    setStories,
    showRegisterModal,
    setShowRegisterModal,
    setIsLoading,
    showAddStoryModal,
    setShowAddStoryModal,
  } = globleContext();

  // Define the story categories to display
  const storyCategory = categoriesData.slice(1, 7);

  // Define the state variables

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showBookmarks, setShowBookmarks] = useState(false);

  // Define the event handlers
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  // Handle the selected filter from the child component
  const handleChildData = (data) => {
    setSelectedFilter(data);
  };

  // Toggle the visibility of the bookmarked stories
  const handleShowBookmark = () => {
    setShowBookmarks((curr) => !curr);
  };

  const fetchStories = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${
        import.meta.env.VITE_SERVER_HOST
      }/story/category?category=${selectedFilter}`
    );
    const { data } = response;
    setIsLoading(false);
    setStories(data);
  };
  useEffect(() => {
    fetchStories();
  }, [selectedFilter, showAddStoryModal]);

  return (
    // Render the Home page components
    <div className={styles.container}>
      <Header
        setShowLoginModal={setShowLoginModal}
        setShowAddStoryModal={setShowAddStoryModal}
        handleShowBookmark={handleShowBookmark}
      />

      <Categories onSelectedValue={handleChildData} />

      {/* Display the register modal if showRegisterModal is true */}
      {showRegisterModal && (
        <RegisterModal handleCloseRegisterModal={handleCloseRegisterModal} />
      )}

      {/* Display the login modal if showLoginModal is true */}
      {showLoginModal && (
        <LoginModal handleCloseLoginModal={handleCloseLoginModal} />
      )}

      {/* Display the add story modal if showAddStoryModal is true */}
      {showAddStoryModal && <AddStoryModal />}

      {/* Display the bookmarked stories if showBookmarks is true and user is logged in */}
      {showBookmarks && user && <BookmarkStories />}

      {/* Display the user's stories if user is logged in */}
      {user && <MyStories />}

      {/* Display all stories for each category */}
      {storyCategory.map((category, i) => (
        <AllStories
          Heading={"Top Stories About"}
          name={category.name}
          key={i}
        />
      ))}
    </div>
  );
};

export default Home;
