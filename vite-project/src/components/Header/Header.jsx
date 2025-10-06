import "./Header.css"
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/AvatarLogo.svg";


function Header() {
    return <header className="header">
        <img src={logo} alt="Header Logo" className="header__logo" />
        <p className="header__date-location">Date, Location</p>
        <button className="header__add-clothes-btn">+ Add clothes</button>
        <div className="header__user-container">
            <p className="header__username">Terrance Tegegne</p>
            <img src={avatar} alt="Header Avatar" className="header__avatar" />
        </div>
    </header>
}

export default Header