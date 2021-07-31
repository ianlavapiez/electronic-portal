import React from "react";
import { PrimaryButtonContainer } from "./PrimaryButton.styles";

const PrimaryButton = (props) => {
  return (
    <PrimaryButtonContainer {...props}>{props.children}</PrimaryButtonContainer>
  );
};

export default PrimaryButton;
