import React, { useState } from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import Form from "antd/es/form";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
import { fireAlert } from "../../../components/sweetalert/SweetAlert";
import ElectronicLogo from "../../../assets/electronic-logo.png";

const AdminLogin = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = ({ email, password }) => {
    if (email === "admin@eportal.com" && password === "password1234") {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        fireAlert("Welcome admin!", "success");

        return history.push("/admin");
      }, 3000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        fireAlert("Incorrect email or password.", "error");
      }, 3000);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Image alt="Electronic Logo" src={ElectronicLogo} />
        <HeaderText>Welcome admin! Please login your account!</HeaderText>
        <FormContainer className="login-form" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputContainer
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <InputContainer
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
                Log in
              </LoginButton>
            </ButtonContainer>
          </Form.Item>
        </FormContainer>
      </LoginContainer>
    </Container>
  );
};

export default compose(withRouter)(AdminLogin);
