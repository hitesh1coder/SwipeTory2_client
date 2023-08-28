import React from "react";
import styles from "./Stories.module.css";
import { globleContext } from "../../Store/Context";
import Header from "../Header/Header";

const BookmarkStories = ({ handleShowBookmark }) => {
  const { bookmarks } = globleContext();
  return (
    <>
      <Header handleShowBookmark={handleShowBookmark} />
      <div className={styles.container}>
        <h2>Your Bookmarks</h2>
        {bookmarks.length <= 0 ? (
          <h4>No Bookmarks Yet</h4>
        ) : (
          <div className={styles.story_cards}>
            {bookmarks.map((story, i) => (
              <div key={i} className={styles.card_container}>
                <img src={story.imageurl} alt="story" />
                <div className={styles.card_details}>
                  <h2 className={styles.heading}>{story.heading}</h2>
                  <p className={styles.desc}>{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookmarkStories;
