import TransactionsActionsTypes from "./transactions.types";

const INITIAL_STATE = {
  actionLoading: false,
  error: null,
  isSuccessful: false,
  loading: false,
  transactions: [],
};

const transactionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_START:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case TransactionsActionsTypes.ADD_TRANSACTION_START:
    case TransactionsActionsTypes.DELETE_TRANSACTION_START:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_START:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_START:
      return {
        ...state,
        error: null,
        actionLoading: true,
        isSuccessful: false,
      };
    case TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        transactions: action.payload,
      };
    case TransactionsActionsTypes.ADD_TRANSACTION_SUCCESS:
    case TransactionsActionsTypes.DELETE_TRANSACTION_SUCCESS:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_SUCCESS:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        error: null,
        isSuccessful: true,
      };
    case TransactionsActionsTypes.ADD_TRANSACTION_RESTART:
    case TransactionsActionsTypes.DELETE_TRANSACTION_RESTART:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_RESTART:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_RESTART:
      return {
        ...state,
        actionLoading: false,
        isSuccessful: false,
      };
    case TransactionsActionsTypes.ADD_TRANSACTION_FAILURE:
    case TransactionsActionsTypes.DELETE_TRANSACTION_FAILURE:
    case TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_FAILURE:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_FAILURE:
    case TransactionsActionsTypes.UPDATE_TRANSACTION_COUNT_FAILURE:
      return {
        ...state,
        actionLoading: false,
        error: action.payload,
        isSuccessful: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default transactionsReducer;
