import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { SignInPageContainer } from "./authentication.styles.jsx";

const Authentication = () => {
  return (
    <SignInPageContainer>
      <SignInForm />
      <SignUpForm />
    </SignInPageContainer>
  );
};

export default Authentication;
