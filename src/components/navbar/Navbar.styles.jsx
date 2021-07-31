import styled from "styled-components";
import Button from "antd/es/button";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

export const NavbarButton = styled(Button)`
  margin: 1rem;
  color: #051c38;
  border-radius: 0.3rem;

  &:hover {
    color: white;
    background-color: #051c38;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 4px 6px -6px #051c38;
`;

export const NavbarLogo = styled.img`
  width: 5vw;
`;
