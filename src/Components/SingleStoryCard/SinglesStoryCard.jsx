import React, { useState } from "react";
import styles from "./StoryCard.module.css";
import { globleContext } from "../../Store/Context";
import ViewStory from "../../FormModals/ViewStoryModal/ViewStoryModal";
import foodImage from "../../images/fitness1.jfif";

const SingleStoryCard = ({ story }) => {
  const { stories, setStories, setShowRegisterModal } = globleContext();
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [storyId, setStoryId] = useState();

  const closeViewStoryModal = () => setViewStoryModal(false);

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
    // setStoryId(story._id);
  };
  return (
    <>
      <div onClick={handleClick} className={styles.card_container}>
        <img src={foodImage} alt="story" />
        <div className={styles.storycount}>{renderStoryBars()}</div>
        <div className={styles.card_details}>
          <h2 className={styles.heading}>Food</h2>
          <p className={styles.desc}>Food is good</p>
        </div>
      </div>
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
