import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  ButtonContainer,
  NavbarButton,
  NavbarContainer,
  NavbarLogo,
} from "./Navbar.styles";
import ElectronicLogo from "../../assets/electronic-logo.png";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

const Navbar = ({ history, signOutStart, user }) => {
  const [type, setType] = useState(null);

  const goToRegistration = () => history.push("/selection");
  const goToLogin = () => history.push("/login");
  const goToTransactions = () => history.push("/transactions");
  const goToYourProducts = () => history.push("/your-products");
  const goToMarketplace = () => history.push("/markets");
  const signOut = () => {
    signOutStart();
    setType(null);
    history.push("/");
  };

  useEffect(() => {
    if (user !== undefined) {
      const { type } = user || {};

      if (type) {
        setType(type);
      }
    } else {
      setType(null);
    }
  }, [setType, user]);

  if (type === "Owner") {
    return (
      <nav>
        <NavbarContainer>
          <Link to="/">
            <NavbarLogo alt="Electronic Logo" src={ElectronicLogo} />
          </Link>
          <ButtonContainer>
            <NavbarButton onClick={goToMarketplace} type="text">
              Marketplace
            </NavbarButton>
            <NavbarButton onClick={goToYourProducts} type="text">
              Your Products
            </NavbarButton>
            <NavbarButton onClick={goToTransactions} type="text">
              Transaction Logs
            </NavbarButton>
            <NavbarButton onClick={signOut} type="text">
              Logout
            </NavbarButton>
          </ButtonContainer>
        </NavbarContainer>
      </nav>
    );
  }

  if (type === "Consumer") {
    return (
      <nav>
        <NavbarContainer>
          <Link to="/">
            <NavbarLogo alt="Electronic Logo" src={ElectronicLogo} />
          </Link>
          <ButtonContainer>
            <NavbarButton onClick={goToMarketplace} type="text">
              Marketplace
            </NavbarButton>
            <NavbarButton onClick={goToTransactions} type="text">
              Transaction Logs
            </NavbarButton>
            <NavbarButton onClick={signOut} type="text">
              Logout
            </NavbarButton>
          </ButtonContainer>
        </NavbarContainer>
      </nav>
    );
  }

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
        </ButtonContainer>
      </NavbarContainer>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
