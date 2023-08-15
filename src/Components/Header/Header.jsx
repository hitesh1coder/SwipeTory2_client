import React, { useRef, useState } from "react";
import Styles from "./Header.module.css";
import bookmarkIcon from "../../images/icons8-bookmark-50.png";
import menuIcon from "../../images/icons8-menu-24.png";
import userpicture from "../../images/userIcon.png";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const user = "";
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle(`${Styles.responsive_nav}`);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <>
      <header>
        <div className={Styles.logo}>
          <h1>SwipTory</h1>
        </div>
        {user ? (
          <div>
            <div ref={navRef} className={Styles.header_content}>
              <button className={Styles.btn}>Register Now</button>
              <button className={Styles.btn2}>Sign in</button>
            </div>
          </div>
        ) : (
          <div>
            <div ref={navRef} className={Styles.header_content}>
              <button className={`${Styles.btn} ${Styles.your_story_btn}`}>
                Your Story
              </button>
              <button className={Styles.btn}>
                <span>
                  <img src={bookmarkIcon} alt="bookmark" />
                </span>
                Bookmark
              </button>
              <button className={Styles.btn}>Add Story</button>
              <div className={Styles.user_container}>
                <img
                  onClick={() => setOpenMenu(!openMenu)}
                  className={Styles.user}
                  src={userpicture}
                  alt="dispaypicture"
                />
                <div
                  style={{ display: openMenu ? `block` : `none` }}
                  className={Styles.user_content_box}
                >
                  <h2>hitesh</h2>
                  <button onClick={handleLogOut} className={Styles.btn}>
                    {" "}
                    logout
                  </button>
                </div>
              </div>
              <button className={`${Styles.btn} ${Styles.logout_btn}`}>
                Logout
              </button>
            </div>
          </div>
        )}
        <img
          onClick={showNavbar}
          className={Styles.menu_icon}
          src={menuIcon}
          alt="menu"
        />
      </header>
    </>
  );
};

export default Header;
