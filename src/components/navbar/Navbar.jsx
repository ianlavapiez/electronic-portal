import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  ButtonContainer,
  NavbarButton,
  NavbarContainer,
  NavbarLogo,
} from "./Navbar.styles";
import ElectronicLogo from "../../assets/electronic-logo.png";

const Navbar = ({ history }) => {
  const goToRegistration = () => history.push("/selection");
  const goToLogin = () => history.push("/login");
  const goToGuestLogin = () => history.push("/guest-login");

  return (
    <nav>
      <NavbarContainer>
        <Link to="/">
          <NavbarLogo alt="Electronic Logo" src={ElectronicLogo} />
        </Link>
        <ButtonContainer>
          <NavbarButton onClick={goToRegistration} type="text">
            Register
          </NavbarButton>
          <NavbarButton onClick={goToLogin} type="text">
            Login
          </NavbarButton>
          <NavbarButton onClick={goToGuestLogin} type="text">
            Login as Guest
          </NavbarButton>
        </ButtonContainer>
      </NavbarContainer>
    </nav>
  );
};

export default withRouter(Navbar);
