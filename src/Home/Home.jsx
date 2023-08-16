import React from "react";
import styles from "./Home.module.css";
import Header from "../Components/Header/Header";
import Categories from "../Components/SelectCategories/Categories";
import AllStories from "../Components/StoriesSection/AllStories";
const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Categories />
      <AllStories />
    </div>
  );
};

export default Home;
