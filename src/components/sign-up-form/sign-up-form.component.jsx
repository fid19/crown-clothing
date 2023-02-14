import { useState } from "react";
import {
  createAuthUserWIthEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!email || confirmPassword != password) {
      alert("Please input a valid email address or password does not match.");

      return;
    }

    try {
      const { user } = await createAuthUserWIthEmailAndPassword(
        email,
        password
      );

      const response = await createUserDocumentFromAuth(user, {
        displayName: displayName,
      });

      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Email already exists");
      } else if (err.code === "auth/weak-password") {
        alert("Password should be atleast 6 characters long");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={onSubmitForm}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          required
          onChange={handleChange}
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
