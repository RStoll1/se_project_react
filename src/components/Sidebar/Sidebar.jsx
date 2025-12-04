import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import avatar from "../../assets/defaultavatar.png";
import React from "react";

export default function Sidebar({ handleEditClick, handleLogoutClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
        <img
          src={currentUser?.avatar || avatar}
          alt="Sidebar Avatar"
          className="sidebar__avatar"
        />
      </div>
      <div className="sidebar__buttons">
        <button
          onClick={handleEditClick}
          className="sidebar__edit-button"
          type="button"
        >
          Change profile data
        </button>
        <button
          onClick={handleLogoutClick}
          className="sidebar__logout-button"
          type="button"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
