import TransactionsActionsTypes from "./transactions.types";

export const addTransactionStart = (data) => ({
  type: TransactionsActionsTypes.ADD_TRANSACTION_START,
  payload: data,
});

export const addTransactionSuccess = () => ({
  type: TransactionsActionsTypes.ADD_TRANSACTION_SUCCESS,
});

export const addTransactionFailure = (error) => ({
  type: TransactionsActionsTypes.ADD_TRANSACTION_FAILURE,
  payload: error,
});

export const addTransactionRestart = () => ({
  type: TransactionsActionsTypes.ADD_TRANSACTION_RESTART,
});

export const deleteTransactionStart = (data) => ({
  type: TransactionsActionsTypes.DELETE_TRANSACTION_START,
  payload: data,
});

export const deleteTransactionSuccess = () => ({
  type: TransactionsActionsTypes.DELETE_TRANSACTION_SUCCESS,
});

export const deleteTransactionFailure = (error) => ({
  type: TransactionsActionsTypes.DELETE_TRANSACTION_FAILURE,
  payload: error,
});

export const deleteTransactionRestart = () => ({
  type: TransactionsActionsTypes.DELETE_TRANSACTION_RESTART,
});

export const retrieveTransactionsStart = (data) => ({
  type: TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_START,
  payload: data,
});

export const retrieveTransactionsSuccess = (data) => ({
  type: TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_SUCCESS,
  payload: data,
});

export const retrieveTransactionsFailure = (error) => ({
  type: TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_FAILURE,
  payload: error,
});

export const updateTransactionStart = (data) => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_START,
  payload: data,
});

export const updateTransactionSuccess = () => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_SUCCESS,
});

export const updateTransactionFailure = (error) => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_FAILURE,
  payload: error,
});

export const updateTransactionRestart = () => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_RESTART,
});

export const updateTransactionCountStart = (data) => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_START,
  payload: data,
});

export const updateTransactionCountSuccess = () => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_SUCCESS,
});

export const updateTransactionCountFailure = (error) => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_FAILURE,
  payload: error,
});

export const updateTransactionCountRestart = () => ({
  type: TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_RESTART,
});
