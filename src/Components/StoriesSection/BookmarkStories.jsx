import React from "react";
import styles from "./Stories.module.css";
import SingleStoryCard from "../SingleStoryCard/SinglesStoryCard";
import { globleContext } from "../../Store/Context";

const BookmarkStories = () => {
  const { stories, bookmarks } = globleContext();
  return (
    <>
      {/* <Header /> */}
      <div className={styles.container}>
        <h2>Your Bookmarks</h2>
        {bookmarks.length <= 0 ? (
          <h4>No Bookmarks Yet</h4>
        ) : (
          <div className={styles.story_cards}>
            {bookmarks.map((story, i) => (
              <SingleStoryCard stories={stories} key={i} story={story} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookmarkStories;
