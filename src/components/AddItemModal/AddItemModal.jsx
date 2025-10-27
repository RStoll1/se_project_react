import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation.js";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
    showErrors,
    touched,
    handleSubmitAttempt,
  } = useFormWithValidation(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    const ok = handleSubmitAttempt();
    if (!ok) return;
    onAddItem(values);
  }

  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.modalId === "add-garment") {
        resetForm(defaultValues, {}, false);
      }
    };
    window.addEventListener("modal:close", handler);
    return () => window.removeEventListener("modal:close", handler);
  }, [resetForm]);

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className={`modal__input ${
            (showErrors || touched.name) && errors.name
              ? "modal__input_type_error"
              : ""
          }`}
          id="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            (showErrors || touched.name) && errors.name
              ? "modal__error_visible"
              : ""
          }`}
        >
          {(showErrors || touched.name) && errors.name ? errors.name : ""}
        </span>
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          name="imageUrl"
          type="text"
          className={`modal__input ${
            (showErrors || touched.imageUrl) && errors.imageUrl
              ? "modal__input_type_error"
              : ""
          }`}
          id="imageUrl"
          placeholder="Image Url"
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
        <span
          className={`modal__error ${
            (showErrors || touched.imageUrl) && errors.imageUrl
              ? "modal__error_visible"
              : ""
          }`}
        >
          {(showErrors || touched.imageUrl) && errors.imageUrl
            ? errors.imageUrl
            : ""}
        </span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            checked={values.weatherType === "hot"}
            value="hot"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            checked={values.weatherType === "warm"}
            value="warm"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            checked={values.weatherType === "cold"}
            value="cold"
            onChange={handleChange}
            className="modal__radio-input"
          />
          Cold
        </label>

        <span
          className={`modal__error ${
            (showErrors || touched.weatherType) && errors.weatherType
              ? "modal__error_visible"
              : ""
          }`}
        >
          {(showErrors || touched.weatherType) && errors.weatherType
            ? errors.weatherType
            : ""}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
