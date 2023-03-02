import styled from "styled-components";

let medium = 900;

export const SignInPageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  // width: 900px;
  margin: 30px auto;
  padding: 0px 30px;

  @media screen and (max-width: ${medium}px) {
    justify-content: center;
  }
`;
