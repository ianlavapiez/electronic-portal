import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  emailSignInStart,
  signOutStart,
  userRestart,
} from "../../../redux/user/user.actions";
import {
  selectCurrentUser,
  selectError,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../redux/user/user.selectors";
import Form from "antd/es/form";
import Text from "antd/es/typography/Text";
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
import { auth } from "../../../firebase/firebase.utils";

const Login = ({
  emailSignInStart,
  error,
  history,
  isLoading,
  isSuccessful,
  signOutStart,
  user,
  userRestart,
}) => {
  const onFinish = ({ email, password }) => {
    emailSignInStart(email, password);
  };

  useEffect(() => {
    if (isSuccessful) {
      if (user !== null) {
        const currentUser = auth.currentUser;

        if (!currentUser.emailVerified) {
          currentUser
            .sendEmailVerification()
            .then(() =>
              fireAlert(
                "We've sent an email verification to validate the ownership of this account.",
                "warning"
              )
            );

          signOutStart();
        } else {
          fireAlert(`Welcome, user!`, "success");

          userRestart();

          return history.push("/markets");
        }
      }
    } else {
      if (error !== null) {
        return fireAlert(error, "warning");
      }
    }
  }, [error, history, isSuccessful, signOutStart, user, userRestart]);

  return (
    <Container>
      <LoginContainer>
        <Image alt="Electronic Logo" src={ElectronicLogo} />
        <HeaderText>Welcome, please login your account!</HeaderText>
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
            <Text>Not yet registered? Click </Text>
            <a href="/selection">here.</a>
          </Form.Item>
          <Form.Item>
            <ButtonContainer>
              <LoginButton
                className="login-form-button"
                htmlType="submit"
                loading={isLoading}
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

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isLoading: selectIsLoading,
  isSuccessful: selectIsSuccessful,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  signOutStart: () => dispatch(signOutStart()),
  userRestart: () => dispatch(userRestart()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Login);
