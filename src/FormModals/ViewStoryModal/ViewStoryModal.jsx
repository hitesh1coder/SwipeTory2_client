import React, { useEffect, useState, useRef } from "react";
import ModalStoryStyles from "./ViewStoryStyles.module.css";
import CloseIcon from "../../images/icons8-close-50 (1).png";
import shareIcon from "../../images/icons8-telegram-50.png";
import bookMarkIcon from "../../images/icons8-bookmark-50.png";
import bookMarkedIcon from "../../images/icons8-bookmark-50 (1).png";
import likedIcon from "../../images/icons8-heart-50 (1).png";
import likeIcon from "../../images/icons8-heart-50.png";
import { globleContext } from "../../Store/Context";
import axios from "axios";

const ViewStoryModal = ({ closeViewStoryModal, storyId }) => {
  const { user, stories, setShowRegisterModal, bookmarks, setBookmarks } =
    globleContext();
  const isBookmarkedStories = user?.bookmarks?.some(
    (story) => story._id === storyId
  );
  const userId = user?.userid;

  const [inProgress, setInProgress] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    stories.findIndex((story) => story._id === storyId)
  );
  const [currentStory, setCurrentStory] = useState(stories[currentStoryIndex]);
  const [liked, setLiked] = useState(currentStory?.likes.includes(userId));
  const [likes, setLikes] = useState(currentStory?.likes.length);
  const [bookmarked, setBookmarked] = useState(isBookmarkedStories);
  const [copySuccess, setCopySucces] = useState("");
  const [barWidth, setBarWidth] = useState(0);
  const firstRender = useRef(true);

  const handleUserExitst = () => {
    closeViewStoryModal();
    setShowRegisterModal(true);
  };

  useEffect(() => {
    setInProgress(true);
    if (barWidth === 0) {
      setBarWidth(100);
    } else if (barWidth === 100) {
      setBarWidth(0);
    }
  }, [currentStory]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCurrentStory(stories[currentStoryIndex + 1]);
  }, [currentStoryIndex]);

  const handleShareStory = async (copyMe) => {
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

  const handleBookmarks = async (storyData) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const url = `${
        import.meta.env.VITE_SERVER_HOST
      }/story/bookmark/${userId}`;
      const config = { headers };
      const response = await axios.post(url, { storyData }, config);

      if (response.status === "SUCCESS") {
        setBookmarked(true);
        setBookmarks([...bookmarks, storyData]);
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
      const response = await axios.put(url, requestData);
      const isLiked = currentStory.likes.includes(userId);

      if (response?.data?.status === "liked" && !isLiked) {
        setLiked(true);
        setLikes((prev) => prev + 1);
      } else if (response?.data?.status === "unliked") {
        setLiked(false);
        setLikes((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex !== stories.length - 1) {
        return prevIndex + 1;
      } else {
        closeViewStoryModal();
        return prevIndex;
      }
    });

    setLikes(stories[currentStoryIndex + 1].likes.length);

    if (stories[currentStoryIndex + 1].likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    const isCurrentStoryBookmarked = bookmarks?.some(
      (story) => story._id === stories[currentStoryIndex + 1]._id
    );
    if (isCurrentStoryBookmarked) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
    setLikes(stories[currentStoryIndex + 1].likes.length);
    if (stories[currentStoryIndex + 1].likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    const isCurrentStoryBookmarked = bookmarks?.some(
      (story) => story._id === stories[currentStoryIndex + 1]._id
    );
    if (isCurrentStoryBookmarked) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };

  const playStories = () => {
    setInProgress((prev) => !prev);
    setCurrentStoryIndex((prevIndex) => {
      const isLastIndex = prevIndex === stories.length - 1;
      if (isLastIndex) {
        closeViewStoryModal();
      }
      return isLastIndex ? prevIndex : prevIndex + 1;
    });
    setLikes(stories[currentStoryIndex + 1].likes.length);
    if (stories[currentStoryIndex + 1].likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }

    const isCurrentStoryBookmarked = bookmarks?.some(
      (story) => story._id === stories[currentStoryIndex + 1]._id
    );
    if (isCurrentStoryBookmarked) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  };
  useEffect(() => {
    const interval = setInterval(playStories, 5000);
    return () => clearInterval(interval);
  }, [currentStory]);

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
          <img src={stories[currentStoryIndex].imageurl} alt="story" />
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
              onClick={() => handleShareStory(stories[currentStoryIndex])}
              alt="share"
            />
          </div>
          <div className={ModalStoryStyles.storycount}>
            <div
              style={{
                transition: `ease-in 5s width`,
                width: `${barWidth}%`,
              }}
              className={ModalStoryStyles.storybar}
            ></div>
          </div>
          <h2 className={ModalStoryStyles.copy_success}>{copySuccess}</h2>
          <div className={ModalStoryStyles.card_details}>
            <h2 className={ModalStoryStyles.heading}>
              {stories[currentStoryIndex].heading}
            </h2>
            <p className={ModalStoryStyles.desc}>
              {stories[currentStoryIndex].description}
            </p>
          </div>
          <div className={ModalStoryStyles.btns2}>
            <img
              className={ModalStoryStyles.bookmark_btn}
              onClick={() =>
                user
                  ? handleBookmarks(stories[currentStoryIndex])
                  : handleUserExitst()
              }
              style={{ pointerEvents: bookmarked ? "none" : "auto" }}
              src={bookmarked ? bookMarkedIcon : bookMarkIcon}
              alt="close"
            />
            <img
              className={ModalStoryStyles.like_btn}
              onClick={() => (user ? handleLike() : handleUserExitst())}
              src={liked ? likedIcon : likeIcon}
              alt="share"
            />
            <span className={ModalStoryStyles.likes_count}>{likes}</span>
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
