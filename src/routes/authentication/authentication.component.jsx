import { useEffect } from "react";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { SignInPageContainer } from "./authentication.styles.jsx";
import { useNavigate } from "react-router-dom";
import {
  selectCurrentUser,
  selectIsLoading,
} from "../../store/user/user.selector";
import { useSelector } from "react-redux";
import { SplashScreen } from "../../components/splashscreen/splashscreen.component";

const Authentication = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectIsLoading);
  console.log(isLoading);
  useEffect(() => {
    if (user) {
      navigate("/shop");
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <SignInPageContainer>
          <SignInForm />
          <SignUpForm />
        </SignInPageContainer>
      )}
    </>
  );
};

export default Authentication;
