import React, { useState } from "react";
import Form from "antd/es/form";
import { UserOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import {
  ButtonContainer,
  Container,
  FormContainer,
  HeaderText,
  Image,
  InputContainer,
  LoginButton,
  LoginContainer,
} from "./Login.styles";
import ElectronicLogo from "../../../assets/electronic-logo.png";
import { fireAlert } from "../../../components/sweetalert/SweetAlert";

const GuestLogin = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = ({ guestName }) => {
    if (guestName) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        fireAlert(`Welcome ${guestName}!`, "success");

        return history.push("/markets");
      }, 3000);
    }

    return;
  };

  return (
    <Container>
      <LoginContainer>
        <Image alt="Electronic Logo" src={ElectronicLogo} />
        <HeaderText>Welcome, please choose your guest name!</HeaderText>
        <FormContainer className="login-form" onFinish={onFinish}>
          <Form.Item
            name="guestName"
            rules={[
              {
                required: true,
                message: "Please input your guest name!",
              },
            ]}
          >
            <InputContainer
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Guest Name"
            />
          </Form.Item>
          <Form.Item>
            <ButtonContainer>
              <LoginButton
                className="login-form-button"
                htmlType="submit"
                loading={loading}
                type="primary"
              >
                Proceed
              </LoginButton>
            </ButtonContainer>
          </Form.Item>
        </FormContainer>
      </LoginContainer>
    </Container>
  );
};

export default withRouter(GuestLogin);
