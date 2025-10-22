import "./Sidebar.css";
import avatar from "../../assets/AvatarLogo.svg";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrance Tegegne</p>
        <img src={avatar} alt="Sidebar Avatar" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
