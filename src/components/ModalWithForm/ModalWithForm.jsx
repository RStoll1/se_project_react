import "./ModalWithForm.css";
import closeIcon from "../../assets/closebtn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  secondaryAction,
}) {
  return (
    <div className={isOpen ? "modal modal_opened" : "modal"}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {secondaryAction}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
