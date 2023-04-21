import { useState, FormEvent, ChangeEvent } from "react";
import { getRedirectResult } from "firebase/auth";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
  signInWithNativeEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import { ButtonContainer, SignInContainer } from "./sign-in-form.styles";
import { USER_ACTION_TYPES } from "../../store/user/user.types";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const defaultSignInForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [signInForm, setSignInForm] = useState(defaultSignInForm);

  const { email, password } = signInForm;

  const dispatch = useDispatch();

  const resetFormFields = () => {
    setSignInForm(defaultSignInForm);
  };

  // useEffect(() => {
  //   async function check() {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   check();
  // }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInForm({ ...signInForm, [name]: value });
  };

  const logGoogleUser = async () => {
    // await signInWithGoogleRedirect();
    dispatch(googleSignInStart());
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please input either a email or a password");
      return;
    }

    try {
      // await signInWithNativeEmailAndPassword(email, password);

      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (err: any) {
      switch (err.code) {
        case AuthErrorCodes.USER_DELETED:
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
    <SignInContainer>
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

        <ButtonContainer>
          <Button type="submit">Sign in</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </ButtonContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
