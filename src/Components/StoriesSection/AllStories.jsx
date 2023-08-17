import React, { useReducer } from "react";
import styles from "./Stories.module.css";
import { globleContext } from "../../Store/Context";
import SingleStoryCard from "../SingleStoryCard/SinglesStoryCard";

const AllStories = ({ Heading, name }) => {
  const { stories, setStories } = globleContext();
  const [isExpanded, toggleSeeMore] = useReducer((state) => !state, false);

  const categoryStories = stories.filter((story) => story.category === name);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        {Heading} {name}
      </h2>
      <div className={styles.story_cards}>
        <SingleStoryCard />
        <SingleStoryCard />
        <SingleStoryCard />
        <SingleStoryCard />
        <SingleStoryCard />
        <SingleStoryCard />

        {categoryStories?.map((story, i) => (
          <SingleStoryCard
            setShowRegisterModal={setShowRegisterModal}
            stories={stories}
            key={i}
            story={story}
          />
        ))}
      </div>
      <button onClick={toggleSeeMore} className={styles.see_more_btn}>
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export default AllStories;
