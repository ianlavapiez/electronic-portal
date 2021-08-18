import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  restartUserReducerStart,
  signUpStart,
} from "../../../redux/user/user.actions";
import {
  selectError,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../redux/user/user.selectors";
import Form from "antd/es/form";
import { fireAlert } from "../../../components/sweetalert/SweetAlert";
import {
  ButtonContainer,
  Container,
  FormContainer,
  FormDivContainer,
  FormMainContainer,
  HeaderText,
  InputContainer,
  InputPasswordContainer,
  RegistrationButton,
  RegistrationContainer,
} from "./Registration.styles";
import { auth } from "../../../firebase/firebase.utils";

const OwnerRegistration = ({
  error,
  history,
  isLoading,
  isSuccessful,
  restartUserReducerStart,
  signUpStart,
}) => {
  useEffect(() => {
    restartUserReducerStart();
  }, [restartUserReducerStart]);

  useEffect(() => {
    if (error) {
      restartUserReducerStart();
      return fireAlert(error, "warning");
    }

    if (isSuccessful) {
      const currentUser = auth.currentUser;

      if (!currentUser.emailVerified) {
        currentUser.sendEmailVerification().then(() => {
          fireAlert(
            "You've successfully registered! Please verify your email before logging in.",
            "success"
          );

          restartUserReducerStart();

          history.push("/login");
        });
      }
    }
  }, [error, history, isSuccessful, restartUserReducerStart]);

  const onFinish = ({
    businessAddress,
    businessName,
    confirmPassword,
    contactNumber,
    email,
    homeAddress,
    password,
    telephoneNumber,
    tinNo,
  }) => {
    if (confirmPassword !== password) {
      return fireAlert("Password doesn't match!", "warning");
    }

    signUpStart({
      businessAddress,
      businessName,
      confirmPassword,
      contactNumber,
      email,
      homeAddress,
      password,
      telephoneNumber,
      tinNo,
      type: "Owner",
    });
  };

  return (
    <Container>
      <RegistrationContainer>
        <HeaderText>
          Welcome owner! Please provide the needed information below to
          register.
        </HeaderText>
        <FormContainer className="login-form" onFinish={onFinish}>
          <FormMainContainer>
            <FormDivContainer>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <InputContainer placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: "Please input your business name!",
                  },
                ]}
              >
                <InputContainer placeholder="Business Name" />
              </Form.Item>
              <Form.Item
                name="tinNo"
                rules={[
                  {
                    required: true,
                    message: "Please input your TIN number!",
                  },
                ]}
              >
                <InputContainer placeholder="TIN Number" />
              </Form.Item>
              <Form.Item
                name="homeAddress"
                rules={[
                  {
                    message: "Please input your home address!",
                    required: true,
                  },
                ]}
              >
                <InputContainer placeholder="Home Address" />
              </Form.Item>
              <Form.Item
                name="businessAddress"
                rules={[
                  {
                    message: "Please input your business address!",
                    required: true,
                  },
                ]}
              >
                <InputContainer placeholder="Business Address" />
              </Form.Item>
            </FormDivContainer>
            <FormDivContainer>
              <Form.Item
                name="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your contact number!",
                  },
                ]}
              >
                <InputContainer placeholder="Contact Number" type="number" />
              </Form.Item>
              <Form.Item
                name="telephoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your telephone number!",
                  },
                ]}
              >
                <InputContainer placeholder="Telephone Number" type="number" />
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
                <InputPasswordContainer placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <InputPasswordContainer placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <ButtonContainer>
                  <RegistrationButton
                    className="login-form-button"
                    htmlType="submit"
                    loading={isLoading}
                    type="primary"
                  >
                    Register
                  </RegistrationButton>
                </ButtonContainer>
              </Form.Item>
            </FormDivContainer>
          </FormMainContainer>
        </FormContainer>
      </RegistrationContainer>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isLoading: selectIsLoading,
  isSuccessful: selectIsSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  restartUserReducerStart: () => dispatch(restartUserReducerStart()),
  signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OwnerRegistration)
);
