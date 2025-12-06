import { useEffect, useState } from "react";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  getItems,
  addItem,
  removeItem,
  login,
  register,
  getCurrentUser,
  editUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditClick = () => {
    setActiveModal("edit-profile");
  };

  const handleRegister = async ({ name, avatarURL, email, password }) => {
    try {
      await register({ name, avatar: avatarURL, email, password });
      closeActiveModal();
      await handleLogin({ email, password });
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      const me = await getCurrentUser(data.token);
      setCurrentUser(me);
      closeActiveModal();
      navigate("/profile");
      console.log("Logged in user:", me);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleEditProfile = async ({ name, avatarURL }) => {
    try {
      const updatedUser = await editUserProfile({ name, avatarURL });
      setCurrentUser(updatedUser);
      closeActiveModal();
    } catch (err) {
      console.error("Profile update failed:", err);
    }
  };

  const deleteItemHandler = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const closeActiveModal = () => {
    try {
      // notify any listeners that a modal is about to close
      window.dispatchEvent(
        new CustomEvent("modal:close", { detail: { modalId: activeModal } })
      );
    } catch (err) {
      // ignore if CustomEvent isn't available for some reason
      // eslint-disable-next-line no-console
      console.error("Error dispatching modal:close event", err);
    }
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  // If a JWT exists, mark logged in and fetch user
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    setIsLoggedIn(true);
    getCurrentUser(token)
      .then((me) => setCurrentUser(me))
      .catch((err) => {
        console.error("Fetching current user failed:", err);
        // If token is invalid/expired, clear login state
        setIsLoggedIn(false);
        setCurrentUser(null);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    const fetchWeatherAndItems = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((err) => {
          console.error(err);
        });

      getItems()
        .then((data) => {
          data.reverse();
          setClothingItems(data);
        })
        .catch(console.error);
    };

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          fetchWeatherAndItems(coords);
        },
        (err) => {
          console.warn(
            "Geolocation failed or denied, falling back to default coordinates",
            err
          );
          fetchWeatherAndItems(coordinates);
        },
        { enableHighAccuracy: false, timeout: 5000 }
      );
    } else {
      fetchWeatherAndItems(coordinates);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              isLoggedIn={isLoggedIn}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn} redirectPath="/">
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditClick={handleEditClick}
                      handleEditProfile={handleEditProfile}
                      handleLogoutClick={handleLogoutClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={deleteItemHandler}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onClose={closeActiveModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onClose={closeActiveModal}
            onSwitchToRegister={handleRegisterClick}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={handleEditProfile}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onClose={closeActiveModal}
            onSwitchToLogin={handleLoginClick}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
