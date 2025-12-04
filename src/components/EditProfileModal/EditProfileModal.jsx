import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";

export default function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({ name: "", avatarURL: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, avatarURL: values.avatarURL });
  };

  useEffect(() => {
    if (!isOpen) return;
    resetForm(
      { name: currentUser?.name || "", avatarURL: currentUser?.avatar || "" },
      {},
      true
    );
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
          required
          minLength={2}
          maxLength={30}
        />
        <span className="modal__error" aria-live="polite">
          {errors.name}
        </span>
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatarURL"
          value={values.avatarURL || ""}
          onChange={handleChange}
          className="modal__input"
          placeholder="https://example.com/image.png"
        />
        <span className="modal__error" aria-live="polite">
          {errors.avatarURL}
        </span>
      </label>
    </ModalWithForm>
  );
}
