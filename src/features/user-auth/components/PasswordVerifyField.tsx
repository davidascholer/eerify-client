import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

interface PasswordFieldProps {
  onSubmit: (values: { password: string }) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ password: "", verifyPassword: "" }}
      validate={(values) => {
        const errors: { [key: string]: string } = {};

        if (!values.password) {
          errors.password = "Password is required";
        }

        if (values.password !== values.verifyPassword) {
          errors.verifyPassword = "Passwords do not match";
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

        <div>
          <label htmlFor="verifyPassword">Verify Password</label>
          <Field type="password" id="verifyPassword" name="verifyPassword" />
          <ErrorMessage name="verifyPassword" component="div" />
        </div>
      </Form>
    </Formik>
  );
};

export default PasswordField;
