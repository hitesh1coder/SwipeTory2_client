import React, { useState } from "react";
import styles from "./StoryCard.module.css";
import { globleContext } from "../../Store/Context";
import ViewStory from "../../FormModals/ViewStoryModal/ViewStoryModal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleStoryCard = ({ story }) => {
  const { stories, isLoading } = globleContext();
  const [viewStoryModal, setViewStoryModal] = useState(false);

  const closeViewStoryModal = () => {
    setViewStoryModal(false);
  };
  const renderStoryBars = () => {
    const renderStories = stories.slice(0, 5);
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
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.card_container}>
            <SkeletonTheme baseColor="#adadad" highlightColor="#cccccc">
              <div className={styles.skeleton}>
                <Skeleton height={330} />
              </div>
            </SkeletonTheme>
          </div>
        </>
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
          storyId={story._id}
          closeViewStoryModal={closeViewStoryModal}
        />
      )}
    </>
  );
};

export default SingleStoryCard;
