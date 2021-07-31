import React from "react";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {
  Container,
  Image,
  ImageContainer,
  TextContainer,
} from "./SecondSection.styles";
import MarketingImage from "../../../assets/home/marketing.svg";

const SecondSection = () => {
  return (
    <Container>
      <TextContainer>
        <Title style={{ color: "white" }}>
          Online Market and Real-time Messaging
        </Title>
        <Text style={{ color: "white" }}>
          This platform allows consumers to view and locate electronic business
          owners showing their business contact information for interaction.
        </Text>
        <br />
        <Text style={{ color: "white" }}>
          The consumers can also message the selected business owners in
          real-time responses.
        </Text>
      </TextContainer>
      <ImageContainer>
        <Image alt="Marketing Image" src={MarketingImage} />
      </ImageContainer>
    </Container>
  );
};

export default SecondSection;
