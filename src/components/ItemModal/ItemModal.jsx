import "./ItemModal.css";
import closeIcon from "../../assets/closebtnwhite.svg";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const handleDelete = () => {
    onDelete(card._id);
  };
  return (
    <div className={activeModal === "preview" ? "modal modal_opened" : "modal"}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <button className="modal__delete-btn" onClick={handleDelete}>
            Delete item
          </button>
        </div>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
