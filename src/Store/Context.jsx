import React, { createContext, useContext, useState } from "react";

const Story = createContext();

const Context = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  return (
    <Story.Provider
      value={{ stories, setStories, showRegisterModal, setShowRegisterModal }}
    >
      {children}
    </Story.Provider>
  );
};
export const Stories = () => {
  return useContext(Story);
};

export default Context;
