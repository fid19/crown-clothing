import styled from "styled-components";

const medium = 819.5;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  padding: 0 10px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: ${medium}px) {
    margin: 70px 0;
  }
`;
