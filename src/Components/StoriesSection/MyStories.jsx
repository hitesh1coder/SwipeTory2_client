import React, { useState, useEffect } from "react";
import Styles from "./Stories.module.css";
import foodImage from "../../images/fitness1.jfif";
import axios from "axios";
import UpdateStoryModal from "../../FormModals/UpdateStoryModal/UpdateStoryModal";
import { globleContext } from "../../Store/Context";

const MyStories = () => {
  const { user } = globleContext();
  //   const id = user.userid;
  const [myStories, setMyStories] = useState([]);
  const [showUpdateStoryModal, setShowUpdateStoryModal] = useState(false);
  const [storyToUpdate, setStoryToUpdate] = useState();

  const handleCloseUpdateStoryModal = () => setShowUpdateStoryModal(false);

  //   const fetchMyStories = async () => {
  //     try {
  //       const myStories = await axios.get(
  //         `${import.meta.env.VITE_SERVER_HOST}/story/${id}/mystory`
  //       );
  //       const { data } = myStories;
  //       setMyStories(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchMyStories();
  //   }, []);

  const handleEdit = (story) => {
    setStoryToUpdate(story);
  };

  return (
    <div className={Styles.container}>
      <h2>Your Stories</h2>
      <div className={Styles.story_cards}>
        <div className={Styles.card_container}>
          <img src={foodImage} alt="story" />
          <div className={Styles.card_details}>
            <h2 className={Styles.heading}>food</h2>
            <p className={Styles.desc}>this is very testy food</p>
          </div>
          <button
            onClick={() => {
              handleEdit(story), setShowUpdateStoryModal(true);
            }}
            className={Styles.edit_btn}
          >
            edit
          </button>
        </div>
        {myStories?.map((story, i) => (
          <div key={i} className={Styles.card_container}>
            <img src={story.imageurl} alt="story" />
            <div className={Styles.card_details}>
              <h2 className={Styles.heading}>{story.heading}</h2>
              <p className={Styles.desc}>{story.description}</p>
            </div>
            <button
              onClick={() => {
                handleEdit(story), setShowUpdateStoryModal(true);
              }}
              className={Styles.edit_btn}
            >
              edit
            </button>
          </div>
        ))}
      </div>
      {showUpdateStoryModal && (
        <UpdateStoryModal
          storyData={storyToUpdate}
          handleCloseUpdateStoryModal={handleCloseUpdateStoryModal}
        />
      )}
    </div>
  );
};

export default MyStories;
