import { createSelector } from "reselect";

const selectTransactions = (state) => state.transactions;

export const selectIsActionLoading = createSelector(
  [selectTransactions],
  (transactions) => transactions.actionLoading
);

export const selectAllTransactions = createSelector(
  [selectTransactions],
  (transactions) => transactions.transactions
);

export const selectIsLoading = createSelector(
  [selectTransactions],
  (transactions) => transactions.loading
);

export const selectIsSuccessful = createSelector(
  [selectTransactions],
  (transactions) => transactions.isSuccessful
);

export const selectError = createSelector(
  [selectTransactions],
  (transactions) => transactions.error
);
