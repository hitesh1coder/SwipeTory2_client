import React, { useRef, useState } from "react";
import Styles from "./Header.module.css";
import bookmarkIcon from "../../images/icons8-bookmark-50.png";
import closeIcon from "../../images/closeIcon.png";
import menuIcon from "../../images/icons8-menu-24.png";
import userpicture from "../../images/userIcon.png";
import { globleContext } from "../../Store/Context";

const Header = ({ setShowLoginModal, handleShowBookmark }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, setUser, setShowRegisterModal, setShowAddStoryModal } =
    globleContext();
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle(`${Styles.responsive_nav}`);
  };
  const handleLogOut = () => {
    localStorage.removeItem("swipetory_user");
    setOpenMenu(false);
    showNavbar();
    setUser("");
    setShowLoginModal(false);
  };
  return (
    <>
      <header>
        <div className={Styles.logo}>
          <h1>SwipTory</h1>
        </div>
        {!user ? (
          <div>
            <div ref={navRef} className={Styles.header_content}>
              <img
                onClick={showNavbar}
                className={Styles.close_icon}
                src={closeIcon}
                alt="close"
              />
              <button
                onClick={() => setShowRegisterModal(true)}
                className={Styles.btn}
              >
                Register Now
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className={Styles.btn2}
              >
                Sign in
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div ref={navRef} className={Styles.header_content}>
              <img
                onClick={showNavbar}
                className={Styles.close_icon}
                src={closeIcon}
                alt="close"
              />
              <button
                onClick={() => showNavbar()}
                className={`${Styles.btn} ${Styles.your_story_btn}`}
              >
                Your Story
              </button>
              <button
                onClick={() => {
                  handleShowBookmark();
                  showNavbar();
                }}
                className={Styles.btn}
              >
                <span>
                  <img src={bookmarkIcon} alt="bookmark" />
                </span>
                Bookmark
              </button>
              <button
                onClick={() => {
                  setShowAddStoryModal(true);
                  showNavbar();
                }}
                className={Styles.btn}
              >
                Add Story
              </button>
              <div className={Styles.user_container}>
                <img
                  className={Styles.user}
                  src={userpicture}
                  alt="dispaypicture"
                />
                {user && <h2>{user.username}</h2>}
                <div
                  style={{ display: openMenu ? `flex` : `none` }}
                  className={Styles.user_menu_box}
                >
                  {user && <h3>{user.username}</h3>}
                  <button onClick={handleLogOut} className={Styles.btn}>
                    {" "}
                    logout
                  </button>
                </div>
              </div>
              <button
                onClick={handleLogOut}
                className={`${Styles.btn} ${Styles.logout_btn}`}
              >
                Logout
              </button>
              <img
                style={{ display: user ? `block` : `none` }}
                onClick={() => setOpenMenu(!openMenu)}
                className={Styles.menu_icon}
                src={menuIcon}
                alt="menu"
              />
            </div>
          </div>
        )}

        <img
          onClick={showNavbar}
          className={Styles.mobile_menu}
          src={menuIcon}
          alt="menu"
        />
      </header>
    </>
  );
};

export default Header;
