import React from "react";
import {
  MainTransactionContainer,
  TransactionTitle,
} from "./TransactionLogs.styles";
import TransactionTable from "./components/TransactionTable";

const TransactionLogsPage = () => {
  return (
    <MainTransactionContainer>
      <TransactionTitle level={2}>Transaction Logs</TransactionTitle>
      <TransactionTable />
    </MainTransactionContainer>
  );
};

export default TransactionLogsPage;
