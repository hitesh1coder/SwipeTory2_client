import React, { useState } from "react";
import styles from "./StoryCard.module.css";
import { globleContext } from "../../Store/Context";
import ViewStory from "../../FormModals/ViewStoryModal/ViewStoryModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleStoryCard = ({ story }) => {
  const { stories, isLoading } = globleContext();
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [storyId, setStoryId] = useState();

  const closeViewStoryModal = () => {
    setViewStoryModal(false);
  };
  const renderStoryBars = () => {
    const renderStories = stories.slice(1, 5);
    return renderStories?.map((data, i) => {
      return (
        <div
          key={i}
          style={{ width: "100%" }}
          className={styles.storybar}
        ></div>
      );
    });
  };

  const handleClick = () => {
    setViewStoryModal(true);
    setStoryId(story._id);
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.card_container}>
          <SkeletonTheme baseColor="#999999" highlightColor="#adadad">
            <p>
              <Skeleton height={330} />
            </p>
          </SkeletonTheme>
        </div>
      ) : (
        <div onClick={handleClick} className={styles.card_container}>
          <img src={story.imageurl} alt={story.heading} />
          <div className={styles.storycount}>{renderStoryBars()}</div>
          <div className={styles.card_details}>
            <h2 className={styles.heading}>{story.heading}</h2>
            <p className={styles.desc}>{story.description}</p>
          </div>
        </div>
      )}
      {viewStoryModal && (
        <ViewStory
          storyId={storyId}
          closeViewStoryModal={closeViewStoryModal}
        />
      )}
    </>
  );
};

export default SingleStoryCard;
