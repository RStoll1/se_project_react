import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

const RegisterModal = ({ isOpen, onRegister, onClose, onSwitchToLogin }) => {
  const defaultValues = {
    email: "",
    password: "",
    name: "",
    avatarURL: "",
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
    onRegister(values);
  }

  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.modalId === "register") {
        resetForm(defaultValues, {}, false);
      }
    };
    window.addEventListener("modal:close", handler);
    return () => window.removeEventListener("modal:close", handler);
  }, [resetForm]);

  return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryAction={
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
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
          value={values.name}
          onChange={handleChange}
          required
        />
        {(showErrors || touched.name) && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className={`modal__input ${
            (showErrors || touched.email) && errors.email
              ? "modal__input_type_error"
              : ""
          }`}
          id="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {(showErrors || touched.email) && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label htmlFor="password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className={`modal__input ${
            (showErrors || touched.password) && errors.password
              ? "modal__input_type_error"
              : ""
          }`}
          id="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {(showErrors || touched.password) && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="avatarURL" className="modal__label">
        Avatar URL
        <input
          name="avatarURL"
          type="url"
          className={`modal__input ${
            (showErrors || touched.avatarURL) && errors.avatarURL
              ? "modal__input_type_error"
              : ""
          }`}
          id="avatarURL"
          placeholder="Avatar URL"
          value={values.avatarURL}
          onChange={handleChange}
        />
        {(showErrors || touched.avatarURL) && errors.avatarURL && (
          <span className="modal__error">{errors.avatarURL}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
