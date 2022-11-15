import { useState } from 'react';

export default function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    console.log(input.closest('form', '12345465'));
    setIsValid(input.closest('form').checkValidity());
  };

  return {
    values, handleChange, setValues, errors, isValid, setIsValid,
  };
}
