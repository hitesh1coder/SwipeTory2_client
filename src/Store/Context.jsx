import React, { createContext, useContext, useState, useEffect } from "react";

const Story = createContext();

const Context = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("swipetory_user")) {
      const getUser = JSON.parse(localStorage.getItem("swipetory_user"));
      setUser(getUser);
      setBookmarks(getUser.bookmarks);
    } else {
      setUser("");
    }
  }, []);
  return (
    <Story.Provider
      value={{
        stories,
        setStories,
        user,
        setUser,
        showRegisterModal,
        setShowRegisterModal,
        viewStoryModal,
        setViewStoryModal,
        isLoading,
        setIsLoading,
        bookmarks,
        setBookmarks,
      }}
    >
      {children}
    </Story.Provider>
  );
};
export const globleContext = () => {
  return useContext(Story);
};

export default Context;
