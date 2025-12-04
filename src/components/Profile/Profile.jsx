import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  handleEditClick,
  handleEditProfile,
  handleLogoutClick,
  onCardLike,
}) {
  return (
    <section className="profile">
      <Sidebar
        handleEditProfile={handleEditProfile}
        handleEditClick={handleEditClick}
        handleLogoutClick={handleLogoutClick}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        handleEditClick={handleEditClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
