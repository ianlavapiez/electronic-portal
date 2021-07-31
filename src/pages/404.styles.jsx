import styled from "styled-components";
import Button from "antd/es/button";

export const LoginButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  background-color: #051b38;
  border-color: #051b38;

  &:focus {
    background-color: #051b38;
    border-color: #051b38;
    color: white;
  }

  &:hover {
    background-color: #4c688b;
    color: white;
    border-color: #4c688b;
  }
`;
