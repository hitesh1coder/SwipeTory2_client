import React, { useEffect, useState, useRef } from "react";
import Styles from "./ViewStoryStyles.module.css";
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
    inProgress ? setBarWidth(0) : setBarWidth(100);
  }, [currentStory]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCurrentStory(stories[currentStoryIndex + 1]);
  }, [currentStoryIndex]);

  const handleShareStory = async (story) => {
    const url = `${
      import.meta.env.VITE_SERVER_HOST
    }/story/singlestory/${story}`;
    try {
      await navigator.clipboard.writeText(url);
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
    setInProgress(false);

    const nextStoryIndex = currentStoryIndex + 1;
    const nextStory = stories[nextStoryIndex];

    setCurrentStoryIndex(nextStoryIndex);

    if (nextStory) {
      setLikes(nextStory.likes.length);
      setLiked(nextStory.likes.includes(userId));
      setBookmarked(bookmarks?.some((story) => story._id === nextStory._id));
    } else {
      closeViewStoryModal();
    }
  };

  const goToPreviousStory = () => {
    setInProgress((prev) => !prev);
    setCurrentStoryIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );

    const nextStoryIndex = currentStoryIndex + 1;
    const nextStory = stories[nextStoryIndex];

    setLikes(nextStory.likes.length);
    setLiked(nextStory.likes.includes(userId));

    const isCurrentStoryBookmarked = bookmarks?.some(
      (story) => story._id === nextStory._id
    );
    setBookmarked(isCurrentStoryBookmarked);
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

    const nextStoryIndex = currentStoryIndex + 1;
    const nextStory = stories[nextStoryIndex];

    setLikes(nextStory.likes.length);
    setLiked(nextStory.likes.includes(userId));
    setBookmarked(bookmarks?.some((story) => story._id === nextStory._id));
  };

  useEffect(() => {
    const interval = setInterval(playStories, 8000);
    return () => clearInterval(interval);
  }, [currentStory]);

  return (
    <>
      <div onClick={closeViewStoryModal} className={Styles.wrapper}></div>
      <div className={Styles.modal_container}>
        <div onClick={goToPreviousStory} className={Styles.prev_btn}>
          prev
        </div>
        <div className={Styles.card_container}>
          <img src={stories[currentStoryIndex].imageurl} alt="story" />
          <div className={Styles.btns}>
            <img
              className={Styles.close_btn}
              onClick={closeViewStoryModal}
              src={CloseIcon}
              alt="close"
            />
            <img
              className={Styles.share_btn}
              src={shareIcon}
              onClick={() => handleShareStory(stories[currentStoryIndex]._id)}
              alt="share"
            />
          </div>
          <div className={Styles.storycount}>
            <div className={Styles.animate}></div>
            <div
              style={{
                transition: `ease-in 8s width`,
                width: ` ${barWidth}%`,
              }}
              className={Styles.storybar}
            ></div>
          </div>
          <h3 className={Styles.copy_success}>{copySuccess}</h3>
          <div className={Styles.card_details}>
            <h2 className={Styles.heading}>
              {stories[currentStoryIndex].heading}
            </h2>
            <p className={Styles.desc}>
              {stories[currentStoryIndex].description}
            </p>
          </div>
          <div className={Styles.buttons_div}>
            <img
              className={Styles.bookmark_btn}
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
              className={Styles.like_btn}
              onClick={() => (user ? handleLike() : handleUserExitst())}
              src={liked ? likedIcon : likeIcon}
              alt="share"
            />
            <span className={Styles.likes_count}>{likes}</span>
          </div>
        </div>
        <div onClick={goToNextStory} className={Styles.next_btn}>
          next
        </div>
      </div>
    </>
  );
};

export default ViewStoryModal;
