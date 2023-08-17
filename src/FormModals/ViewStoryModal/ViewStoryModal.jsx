import React, { useEffect, useState, useRef } from "react";
import ModalStoryStyles from "./ViewStoryStyles.module.css";
import CloseIcon from "../../images/icons8-close-50 (1).png";
import shareIcon from "../../images/icons8-telegram-50.png";
import bookMarkIcon from "../../images/icons8-bookmark-50.png";
import bookMarkedIcon from "../../images/icons8-bookmark-50 (1).png";
import likedIcon from "../../images/icons8-heart-50 (1).png";
import likeIcon from "../../images/icons8-heart-50.png";
import imageurl from "../../images/fantacy.png";
import { globleContext } from "../../Store/Context";
import axios from "axios";

const ViewStoryModal = ({ closeViewStoryModal, storyId }) => {
  const { user, stories, setShowRegisterModal } = globleContext();
  // const userBookmarkedStories = user?.bookmarks?.some(
  //   (story) => story._id === storyId
  // );
  const userId = user?.userid;
  const [inProgress, setInProgress] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    stories.findIndex((story) => story._id === storyId)
  );
  const [currentStory, setCurrentStory] = useState(stories[currentStoryIndex]);
  const [liked, setLiked] = useState(currentStory?.likes.includes(userId));
  const [likes, setLikes] = useState(currentStory?.likes.length);
  const [copySuccess, setCopySucces] = useState("");
  // const [bookmarked, setBookmarked] = useState(userBookmarkedStories);
  const [bookmarked, setBookmarked] = useState();

  const firstRender = useRef(true);

  useEffect(() => {
    setInProgress(true);
  }, []);

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex !== stories.length - 1) {
        return prevIndex + 1;
      } else {
        closeViewStoryModal();
        return prevIndex;
      }
    });
  };

  const playStories = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikes((prevLikes) => (liked ? prevLikes + 1 : prevLikes - 1));
    setInProgress((prev) => !prev);
    setCurrentStoryIndex((prevIndex) => {
      const isLastIndex = prevIndex === stories.length - 1;
      if (isLastIndex) {
        closeViewStoryModal();
      }
      return isLastIndex ? prevIndex : prevIndex + 1;
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCurrentStory(stories[currentStoryIndex + 1]);
  }, [currentStoryIndex]);

  useEffect(() => {
    const interval = setInterval(playStories, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handleCopyToClipboard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySucces("copy to clipboard");
      setTimeout(() => {
        setCopySucces("");
      }, 3000);
    } catch (error) {
      setCopySucces("failed to copy");
    }
  };
  setTimeout(() => {
    setCopySucces("");
  }, 3000);
  const addToBookmarks = async (storyData) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const url = `${
        import.meta.env.VITE_SERVER_HOST
      }/story/bookmark/${userId}`;
      const config = { headers };
      const response = await axios.post(url, { storyData }, config);
      if (response.status === "ok") {
        setBookmarked(true);
      } else {
        setBookmarked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleLike = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_HOST}/story/like/${storyId}`;
      const requestData = { userId };
      await axios.put(url, requestData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserExitst = () => {
    closeViewStoryModal();
    setShowRegisterModal(true);
  };
  return (
    <>
      <div
        onClick={closeViewStoryModal}
        className={ModalStoryStyles.wrapper}
      ></div>
      <div className={ModalStoryStyles.modal_container}>
        <div onClick={goToPreviousStory} className={ModalStoryStyles.prev_btn}>
          prev
        </div>
        <div className={ModalStoryStyles.card_container}>
          <img src={imageurl} alt="story" />
          {/* <img src={stories[currentStoryIndex].imageurl} alt="story" /> */}
          <div className={ModalStoryStyles.btns}>
            <img
              className={ModalStoryStyles.close_btn}
              onClick={closeViewStoryModal}
              src={CloseIcon}
              alt="close"
            />
            <img
              className={ModalStoryStyles.share_btn}
              src={shareIcon}
              // onClick={() => handleCopyToClipboard(stories[currentStoryIndex])}
              alt="share"
            />
          </div>
          <div className={ModalStoryStyles.storycount}>
            <div
              style={{
                transition: `ease-in 5s width`,
                width: inProgress ? "100%" : "0%",
              }}
              className={ModalStoryStyles.storybar}
            ></div>
          </div>
          <h2 className={ModalStoryStyles.copy_success}>{copySuccess}</h2>
          <div className={ModalStoryStyles.card_details}>
            <h2 className={ModalStoryStyles.heading}>
              {/* {stories[currentStoryIndex].heading} */}
              god to go
            </h2>
            <p className={ModalStoryStyles.desc}>
              {/* {stories[currentStoryIndex].description} */}
              tjhisdew sdfk;dsf ndn;sd dsojos
            </p>
          </div>
          <div className={ModalStoryStyles.btns2}>
            <img
              className={ModalStoryStyles.bookmark_btn}
              onClick={() =>
                user
                  ? addToBookmarks(stories[currentStoryIndex])
                  : handleUserExitst()
              }
              style={{ pointerEvents: bookmarked ? "none" : "auto" }}
              src={bookmarked ? bookMarkedIcon : bookMarkIcon}
              alt="close"
            />
            <img
              className={ModalStoryStyles.like_btn}
              onClick={() => (user ? handleLike() : handleUserExitst())}
              style={{ pointerEvents: liked ? "none" : "auto" }}
              src={liked ? likedIcon : likeIcon}
              alt="share"
            />
            <span className={ModalStoryStyles.likes_count}>
              {stories[currentStoryIndex]?.likes.length}
            </span>
          </div>
        </div>
        <div onClick={goToNextStory} className={ModalStoryStyles.next_btn}>
          next
        </div>
      </div>
    </>
  );
};

export default ViewStoryModal;
