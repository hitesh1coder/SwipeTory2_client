import React, { createContext, useContext, useState, useEffect } from "react";

const Story = createContext();

const Context = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState();
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("swipetory_user")) {
      setUser(JSON.parse(localStorage.getItem("swipetory_user")));
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
