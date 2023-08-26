import React, { useState } from "react";
import styles from "./Stories.module.css";
import { globleContext } from "../../Store/Context";
import SingleStoryCard from "../SingleStoryCard/SinglesStoryCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AllStories = ({ Heading, name }) => {
  const { stories, setShowRegisterModal, isLoading } = globleContext();
  const [showAll, setShowAll] = useState(false);

  const categoryStories = stories.filter((story) => story.category === name);

  const cardsToRender = showAll ? categoryStories : categoryStories.slice(0, 4);
  return (
    <>
      {isLoading ? (
        <div className={styles.container}>
          <SkeletonTheme baseColor="#adadad" highlightColor="#cccccc">
            <div className={styles.Skeleton}>
              <Skeleton height={30} />
            </div>
          </SkeletonTheme>
          <div className={styles.story_cards}>
            <SingleStoryCard />
            <SingleStoryCard />
            <SingleStoryCard />
            <SingleStoryCard />
          </div>
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
                {cardsToRender?.map((story, i) => (
                  <SingleStoryCard
                    setShowRegisterModal={setShowRegisterModal}
                    key={i}
                    story={story}
                  />
                ))}
              </div>
              {categoryStories.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className={styles.see_more_btn}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllStories;
