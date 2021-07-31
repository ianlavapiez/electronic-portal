import React from "react";
import { withRouter } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {
  Container,
  FormMainContainer,
  HeaderText,
  RegistrationCard,
  RegistrationContainer,
  SelectionDivContainer,
} from "./Registration.styles";
import ConsumerLogo from "../../../assets/consumer.svg";
import OwnerLogo from "../../../assets/owner.svg";

const Selection = ({ history }) => {
  const goToConsumerRegistration = () => history.push("/consumer-registration");
  const goToOwnerRegistration = () => history.push("/owner-registration");

  return (
    <Container>
      <RegistrationContainer>
        <HeaderText style={{ marginBottom: "2rem" }}>
          Welcome! Please choose your type of registration.
        </HeaderText>
        <FormMainContainer>
          <SelectionDivContainer>
            <RegistrationCard
              cover={<img alt="Owner Logo" src={OwnerLogo} />}
              hoverable
              onClick={goToOwnerRegistration}
              style={{ width: 300 }}
            >
              <Meta
                title="As a Owner"
                description="Your products can be sold to over a thousand consumers in the platform!"
              />
            </RegistrationCard>
          </SelectionDivContainer>
          <SelectionDivContainer>
            <RegistrationCard
              cover={<img alt="Consumer Logo" src={ConsumerLogo} />}
              hoverable
              onClick={goToConsumerRegistration}
              style={{ width: 545 }}
            >
              <Meta
                title="As a Consumer"
                description="Buy goods from one of our best local electronic business owners in the region!"
              />
            </RegistrationCard>
          </SelectionDivContainer>
        </FormMainContainer>
      </RegistrationContainer>
    </Container>
  );
};

export default withRouter(Selection);
