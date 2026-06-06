import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = (newValues = initialValues) => {
    setValues(newValues);
  };

  return {
    values,
    setValues,
    handleChange,
    resetForm,
  };
}

export default useForm;
