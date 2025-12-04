import "./Header.css";
import React from "react";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/AvatarLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleRegisterClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = React.useContext(CurrentUserContext);
  const displayName = currentUser?.name || "User";
  const displayAvatar = currentUser?.avatar || null;
  const initial = (displayName || "").trim().charAt(0).toUpperCase();
  return (
    <header className="header">
      <NavLink to="/">
        <img src={logo} alt="Header Logo" className="header__logo" />
      </NavLink>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <NavLink className="header__nav-link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{displayName}</p>
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName || "Header Avatar"}
                  className="header__avatar"
                />
              ) : (
                <div
                  className="header__avatar header__avatar_circle"
                  aria-label={displayName || "Header Avatar"}
                  title={displayName}
                >
                  {initial}
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <>
          <button
            onClick={handleLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
          <button
            onClick={handleRegisterClick}
            type="button"
            className="header__login-btn"
          >
            Register
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
