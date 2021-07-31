import styled from "styled-components";
import Button from "antd/es/button";
import Card from "antd/es/card";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Text from "antd/es/typography/Text";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 1rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const DatePickerContainer = styled(DatePicker)`
  padding: 0.7rem;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;

export const FormContainer = styled(Form)`
  width: 100%;
  padding: 2rem;
`;

export const FormDivContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  flex-direction: column;
  width: 95%;
  padding: 1rem;
`;

export const FormMainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled(Text)`
  text-align: center;
`;

export const InputContainer = styled(Input)`
  padding: 0.7rem;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const InputPasswordContainer = styled(Input.Password)`
  padding: 0.7rem;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const RegistrationButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  background-color: #051b38;
  border-color: #051b38;

  &:focus {
    background-color: #051b38;
    border-color: #051b38;
    color: white;
  }

  &:hover {
    background-color: #4c688b;
    color: white;
    border-color: #4c688b;
  }
`;

export const RegistrationCard = styled(Card)`
  width: 100%;
`;

export const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  width: 90vw;
  padding: 1rem;

  @media screen and (max-width: 1110px) {
    width: 70vw;
  }

  @media screen and (max-width: 660px) {
    width: 90vw;
  }
`;

export const SelectionDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 1rem;
`;
