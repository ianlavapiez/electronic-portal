import React from "react";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {
  Container,
  Image,
  ImageContainer,
  TextContainer,
} from "./ThirdSection.styles";
import ReviewImage from "../../../assets/home/review.svg";

const ThirdSection = () => {
  return (
    <Container>
      <ImageContainer>
        <Image alt="Review Image" src={ReviewImage} />
      </ImageContainer>
      <TextContainer>
        <Title level={2}>Real-time Reviews</Title>
        <Text>
          This feature enables a consumer to rate the services offered by
          business owners.
        </Text>
        <br />
        <Text>
          Through this, the other consumers can also have more confidence to
          negotiate or buy their products.
        </Text>
      </TextContainer>
    </Container>
  );
};

export default ThirdSection;
