import React, { useEffect, useState } from "react";
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
  DatePickerContainer,
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

const ConsumerRegistration = ({
  error,
  history,
  isLoading,
  isSuccessful,
  restartUserReducerStart,
  signUpStart,
}) => {
  const [birthDate, setBirthDate] = useState();

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
    completeAddress,
    confirmPassword,
    contactNumber,
    email,
    firstName,
    lastName,
    middleName,
    password,
  }) => {
    if (confirmPassword !== password) {
      return fireAlert("Password doesn't match!", "warning");
    }

    signUpStart({
      birthDate,
      completeAddress,
      contactNumber,
      email,
      firstName,
      lastName,
      middleName,
      password,
      type: "Consumer",
    });
  };

  const onBirthDateChange = (value, dateString) => setBirthDate(dateString);

  return (
    <Container>
      <RegistrationContainer>
        <HeaderText>
          Welcome consumer! Please provide the needed information below to
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
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <InputContainer placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="middleName"
                rules={[
                  {
                    message: "Please input your middle name!",
                    required: true,
                  },
                ]}
              >
                <InputContainer placeholder="Middle Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name!",
                  },
                ]}
              >
                <InputContainer placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                name="birthDate"
                rules={[
                  {
                    required: true,
                    message: "Please select your birth date!",
                  },
                ]}
              >
                <DatePickerContainer
                  onChange={onBirthDateChange}
                  placeholder="Select your birth date"
                />
              </Form.Item>
            </FormDivContainer>
            <FormDivContainer>
              <Form.Item
                name="completeAddress"
                rules={[
                  {
                    message: "Please input your complete address!",
                    required: true,
                  },
                ]}
              >
                <InputContainer placeholder="Complete Address" />
              </Form.Item>
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
  connect(mapStateToProps, mapDispatchToProps)(ConsumerRegistration)
);
