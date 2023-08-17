import React, { createContext, useContext, useState } from "react";

const Story = createContext();

const Context = ({ children }) => {
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState("hitesh");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   if (!userInfo) {
  //     history.push("/");
  //   }
  // }, [history]);

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
