import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues = {}) {
    const [values, setValues] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [touched, setTouched] = useState({});

    function validateField(name, value) {
        // return an error message string (empty when valid)
        if (name === "name") {
            if (!value || String(value).trim() === "") return "Name is required.";
            if (String(value).length > 60) return "Name must be 60 characters or fewer.";
            return "";
        }

        if (name === "imageUrl") {
            if (!value || String(value).trim() === "") return "Image URL is required.";
            try {
                /* eslint-disable no-undef */
                new URL(value);
                return "";
            } catch (e) {
                return "Please enter a valid URL.";
            }
        }

        if (name === "weatherType") {
            if (!value) return "Please select a weather type.";
            return "";
        }

        return "";
    }

    function validateAll(currentValues = values) {
        const nextErrors = {};
        Object.keys(defaultValues).forEach((key) => {
            nextErrors[key] = validateField(key, currentValues[key]);
        });
        // also handle cases where defaultValues doesn't contain keys (defensive)
        Object.keys(currentValues).forEach((key) => {
            if (!(key in nextErrors)) nextErrors[key] = validateField(key, currentValues[key]);
        });

        const formIsValid = !Object.values(nextErrors).some((msg) => Boolean(msg));
        setErrors(nextErrors);
        setIsValid(formIsValid);
        return { nextErrors, formIsValid };
    }

    function handleChange(evt) {
        const { name, value, type, checked } = evt.target;
        const fieldValue = type === "checkbox" ? checked : value;

        setValues((prev) => {
            const next = { ...prev, [name]: fieldValue };
            // mark field as touched
            setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
            // validate field and overall on each change
            validateAll(next);
            return next;
        });
    }

    function handleSubmitAttempt() {
        setShowErrors(true);
        const { formIsValid, nextErrors } = validateAll();
        // mark all fields as touched so errors become visible
        const allTouched = {};
        Object.keys(nextErrors).forEach((k) => (allTouched[k] = true));
        setTouched(allTouched);
        return formIsValid;
    }

    const resetForm = useCallback(
        (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
            setShowErrors(false);
        },
        [defaultValues]
    );

    return {
        values,
        errors,
        isValid,
        showErrors,
        touched,
        handleChange,
        handleSubmitAttempt,
        resetForm,
        setValues,
        setErrors,
        setShowErrors,
        setTouched,
    };
}
