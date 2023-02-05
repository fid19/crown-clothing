import { useState, useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import Button from "../button/button.component";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInWithNativeEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultSignInForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInForm, setSignInForm] = useState(defaultSignInForm);

  const { email, password } = signInForm;

  const resetFormFields = () => {
    setSignInForm(defaultSignInForm);
  };

  useEffect(() => {
    async function check() {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        const userDocRef = createUserDocumentFromAuth(response.user);
      }
    }
    check();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInForm({ ...signInForm, [name]: value });
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    // console.log(user);
    await createUserDocumentFromAuth(user);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please input either a email or a password");
      return;
    }

    try {
      const user = await signInWithNativeEmailAndPassword(email, password);
      console.log(user);

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          alert("Username does not exist");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={onSubmitForm}>
        <FormInput
          label="email"
          required
          type="text"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="password"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
