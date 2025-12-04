import "./ItemCard.css";
import likebtn from "../../assets/likebtn.svg";
import likebtnchecked from "../../assets/likebtnchecked.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked =
    Array.isArray(item.likes) && currentUser?._id
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  // Build className for like button to reflect active state
  const itemLikeButtonClassName = `card__like-btn${
    isLiked ? " card__like-btn_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <img
            onClick={handleLike}
            src={isLiked ? likebtnchecked : likebtn}
            alt={isLiked ? "Unlike" : "Like"}
            className={itemLikeButtonClassName}
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
