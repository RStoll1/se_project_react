import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useEffect } from "react";

const LoginModal = ({ isOpen, onLogin, onClose, onSwitchToRegister }) => {
  const defaultValues = {
    email: "",
    password: "",
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
    onLogin(values);
  }

  useEffect(() => {
    const handler = (e) => {
      if (e?.detail?.modalId === "login") {
        resetForm(defaultValues, {}, false);
      }
    };
    window.addEventListener("modal:close", handler);
    return () => window.removeEventListener("modal:close", handler);
  }, [resetForm]);

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      secondaryAction={
        <button
          type="button"
          className="modal__secondary-button"
          onClick={onSwitchToRegister}
        >
          or Register
        </button>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className={`modal__input ${
            (showErrors || touched.email) && errors.email
              ? "modal__input_type_error"
              : ""
          }`}
          id="login-email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
        {(showErrors || touched.email) && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          className={`modal__input ${
            (showErrors || touched.password) && errors.password
              ? "modal__input_type_error"
              : ""
          }`}
          id="login-password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
        {(showErrors || touched.password) && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
