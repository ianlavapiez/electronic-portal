import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import TransactionsActionsTypes from "./transactions.types";
import { firestore } from "../../firebase/firebase.utils";
import {
  addTransactionFailure,
  addTransactionSuccess,
  deleteTransactionFailure,
  deleteTransactionSuccess,
  retrieveTransactionsFailure,
  retrieveTransactionsSuccess,
  updateTransactionFailure,
  updateTransactionSuccess,
} from "./transactions.actions";

function* addTransaction({
  payload: {
    name,
    price,
    quantity,
    userId,
    businessAddress,
    businessName,
    telephoneNumber,
    contactNumber,
    buyerId,
    productQuantity,
    productId,
  },
}) {
  try {
    const id = uuidv4();
    const createdAt = new Date();
    const reference = yield firestore.collection("transactions").doc(id);

    yield reference.set({
      name,
      buyerId,
      price,
      quantity,
      userId,
      businessAddress,
      businessName,
      telephoneNumber,
      contactNumber,
      createdAt,
      productId,
      id,
      completed: false,
      status: "pending",
    });

    const productReference = yield firestore
      .collection("products")
      .doc(productId);

    yield productReference.update({
      quantity: productQuantity.toString(),
    });

    yield retrieveTransactions();
    yield put(addTransactionSuccess());
  } catch (error) {
    yield put(addTransactionFailure(error.message));
  }
}

function* deleteTransaction({ payload: { id, productId, productQuantity } }) {
  try {
    yield firestore.collection("transactions").doc(id).delete();

    const productReference = yield firestore
      .collection("products")
      .doc(productId);

    yield productReference.update({
      quantity: productQuantity,
    });

    yield retrieveTransactions();
    yield put(deleteTransactionSuccess());
  } catch (error) {
    yield put(deleteTransactionFailure(error.message));
  }
}

function* retrieveTransactions() {
  try {
    const reference = yield firestore
      .collection("transactions")
      .orderBy("createdAt", "desc");

    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveTransactionsSuccess([]));
    } else {
      let transactions = [];

      snapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
          key: doc.id,
          totalAmount: doc.data().quantity * doc.data().price,
        };

        transactions.push(data);
      });

      yield put(retrieveTransactionsSuccess(transactions));
    }
  } catch (error) {
    yield put(retrieveTransactionsFailure(error.message));
  }
}

function* updateTransaction({ payload: { id, productId, quantity, status } }) {
  try {
    const reference = yield firestore.collection("transactions").doc(id);

    yield reference.update({
      status,
    });

    if (status === "completed") {
      return yield put(updateTransactionSuccess());
    }

    const productReference = yield firestore
      .collection("products")
      .doc(productId);

    let fetchedProduct;

    yield productReference.get().then((doc) => {
      if (doc.exists) {
        fetchedProduct = doc.data();
      }
    });

    const checker = yield firestore.collection("products").doc(productId);
    const updatedQuantity =
      parseInt(fetchedProduct.quantity) + parseInt(quantity);

    yield checker.update({
      quantity: updatedQuantity.toString(),
    });

    yield put(updateTransactionSuccess());
  } catch (error) {
    yield put(updateTransactionFailure(error.message));
  }
}

function* onAddTransactionStart() {
  yield takeLatest(
    TransactionsActionsTypes.ADD_TRANSACTION_START,
    addTransaction
  );
}

function* onDeleteTransactionStart() {
  yield takeLatest(
    TransactionsActionsTypes.DELETE_TRANSACTION_START,
    deleteTransaction
  );
}

function* onRetrieveTransactionStart() {
  yield takeLatest(
    TransactionsActionsTypes.RETRIEVE_TRANSACTIONS_START,
    retrieveTransactions
  );
}

function* onUpdateTransactionStart() {
  yield takeLatest(
    TransactionsActionsTypes.UPDATE_TRANSACTION_START,
    updateTransaction
  );
}

export function* transactionsSaga() {
  yield all([
    call(onAddTransactionStart),
    call(onDeleteTransactionStart),
    call(onRetrieveTransactionStart),
    call(onUpdateTransactionStart),
  ]);
}
