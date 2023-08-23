import React, { useReducer } from "react";
import styles from "./Stories.module.css";
import { globleContext } from "../../Store/Context";
import SingleStoryCard from "../SingleStoryCard/SinglesStoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AllStories = ({ Heading, name }) => {
  const { stories, setShowRegisterModal, isLoading } = globleContext();
  const [isExpanded, toggleSeeMore] = useReducer((state) => !state, false);

  const categoryStories = stories.filter((story) => story.category === name);
  return (
    <>
      {isLoading ? (
        <div className={styles.container}>
          <p>loading...</p>
          <SkeletonTheme baseColor="#999999" highlightColor="#adadad">
            <div className={styles.story_cards}>
              <p>
                <Skeleton />
              </p>
            </div>
          </SkeletonTheme>
        </div>
      ) : (
        <>
          {categoryStories?.length <= 0 ? (
            ""
          ) : (
            <div className={styles.container}>
              <h2 className={styles.heading}>
                {Heading} {name}
              </h2>
              <div className={styles.story_cards}>
                {categoryStories?.map((story, i) => (
                  <SingleStoryCard
                    setShowRegisterModal={setShowRegisterModal}
                    key={i}
                    story={story}
                  />
                ))}
              </div>
              <button onClick={toggleSeeMore} className={styles.see_more_btn}>
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllStories;
