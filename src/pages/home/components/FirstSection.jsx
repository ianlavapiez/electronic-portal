import React from "react";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";
import {
  AccountButton,
  ButtonContainer,
  Container,
  Image,
  ImageContainer,
  MarketButton,
  TextContainer,
} from "./FirstSection.styles";
import OnlineTransactionImage from "../../../assets/home/online-transactions.svg";

const FirstSection = () => {
  return (
    <Container>
      <ImageContainer>
        <Image alt="Online Transaction Image" src={OnlineTransactionImage} />
      </ImageContainer>
      <TextContainer>
        <Title>Zap E-Portal</Title>
        <Text>
          Zap E-Portal is an online platform dedicated to promote faster
          transactions between electronic business owners to consumers.
        </Text>
        <ButtonContainer>
          <AccountButton to="/selection">Open an account today</AccountButton>
          <MarketButton to="/login">Start buy/sell</MarketButton>
        </ButtonContainer>
      </TextContainer>
    </Container>
  );
};

export default FirstSection;
