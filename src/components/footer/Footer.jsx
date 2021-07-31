import React from "react";
import { Container, LinkContainer, TextLink } from "./Footer.styles";

const Footer = () => {
  return (
    <footer>
      <Container>
        <LinkContainer>
          <TextLink href="/selection">Register</TextLink>
          <TextLink href="/login">Login</TextLink>
        </LinkContainer>
        <LinkContainer>All Rights Reserved. 2021.</LinkContainer>
      </Container>
    </footer>
  );
};

export default Footer;
