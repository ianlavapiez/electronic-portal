import styled from "styled-components";
import Button from "antd/es/button";

export const PrimaryButtonContainer = styled(Button)`
  height: 5vh;
  width: 15vw;
  margin-top: 1rem;
  background-color: #051b38;
  border-color: #051b38;

  &:hover {
    background-color: #4c688b;
    border-color: #4c688b;
  }
`;
