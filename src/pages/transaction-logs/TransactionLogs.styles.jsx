import styled from "styled-components";
import Button from "antd/es/button";
import Card from "antd/es/card";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

export const TransactionButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 0.5rem;
  background-color: #051b38;
  border-color: #051b38;
  color: white;
  margin: 10px;

  &:focus {
    background-color: #051b38;
    border-color: #051b38;
    color: white;
  }

  &:hover {
    background-color: white;
    color: #4c688b;
    border-color: #4c688b;
  }
`;

export const TransactionCard = styled(Card)`
  width: 100%;
`;

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
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
  margin-top: -10px;
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

export const MainTransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const TransactionTitle = styled(Title)`
  margin: 2rem;
`;

export const TransactionsTableContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -300px;
`;
