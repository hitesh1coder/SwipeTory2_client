import React from "react";
import styles from "./Stories.module.css";
import StoryCard from "../SingleStoryCard/StoryCard";

const AllStories = () => {
  return (
    <div>
      <h1>AllStories</h1>
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
    </div>
  );
};

export default AllStories;
