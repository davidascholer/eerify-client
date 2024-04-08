import React from "react";
import { Field, Form, ErrorMessage } from "formik";

interface FormValues {
  email: string;
}

const EmailField: React.FC = () => {
  const initialValues: FormValues = {
    email: "",
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  return (
    <Form>
      <div>
        <label htmlFor="email">Email</label>
        <Field type="email" id="email" name="email" validate={validateEmail} />
        <ErrorMessage name="email" component="div" />
      </div>
    </Form>
  );
};

export default EmailField;
