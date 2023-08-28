import React, { useState, useEffect } from "react";
import Styles from "./Stories.module.css";
import axios from "axios";
import UpdateStoryModal from "../../FormModals/UpdateStoryModal/UpdateStoryModal";
import { globleContext } from "../../Store/Context";

const MyStories = () => {
  const { user, isLoading } = globleContext();
  const id = user.userid;
  const [myStories, setMyStories] = useState([]);
  const [showUpdateStoryModal, setShowUpdateStoryModal] = useState(false);
  const [storyToUpdate, setStoryToUpdate] = useState();
  const [showAll, setShowAll] = useState(false);

  const handleCloseUpdateStoryModal = () => setShowUpdateStoryModal(false);

  const fetchMyStories = async () => {
    try {
      const myStories = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/story/${id}/mystory`
      );
      const { data } = myStories;
      setMyStories(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMyStories();
  }, [myStories]);

  const handleEdit = (story) => {
    setStoryToUpdate(story);
  };
  const storiesToRender = showAll ? myStories : myStories.slice(0, 4);
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className={Styles.container}>
          <h2>Your Stories</h2>
          {myStories.length === 0 ? (
            <h4>You don't have any Story yet</h4>
          ) : (
            <>
              <div className={Styles.story_cards}>
                {storiesToRender?.map((story, i) => (
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
              {myStories.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className={Styles.see_more_btn}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MyStories;
