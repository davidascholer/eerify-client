import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

interface PasswordFieldProps {
  onSubmit: (values: { password: string }) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ password: "" }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.password) {
          errors.password = "Password is required";
        }

        return errors;
      }}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      <Form>
        <div>
          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" />
        </div>
      </Form>
    </Formik>
  );
};

export default PasswordField;
