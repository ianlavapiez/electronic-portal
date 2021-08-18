import { takeLatest, put, all, call } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import ProductsActionsTypes from "./products.types";
import { firestore, storage } from "../../firebase/firebase.utils";
import {
  addProductFailure,
  addProductSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  retrieveProductsFailure,
  retrieveProductsSuccess,
  updateProductCountFailure,
  updateProductCountSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "./products.actions";

function* addProduct({
  payload: {
    name,
    description,
    price,
    quantity,
    imageFile,
    userId,
    businessAddress,
    businessName,
    telephoneNumber,
    contactNumber,
  },
}) {
  try {
    const id = uuidv4();
    const createdAt = new Date();
    const reference = yield firestore.collection("products").doc(id);

    yield storage.ref(`/products/${id}/${imageFile.name}`).put(imageFile);

    const imageUrl = yield storage
      .ref(`products/${id}`)
      .child(imageFile.name)
      .getDownloadURL();

    yield reference.set({
      name,
      description,
      price,
      quantity,
      userId,
      businessAddress,
      businessName,
      telephoneNumber,
      contactNumber,
      imageUrl,
      createdAt,
      id,
    });

    yield retrieveProducts({ payload: { userId } });
    yield put(addProductSuccess());
  } catch (error) {
    yield put(addProductFailure(error.message));
  }
}

function* deleteProduct({ payload: { id } }) {
  try {
    yield firestore.collection("products").doc(id).delete();

    yield retrieveProducts();
    yield put(deleteProductSuccess());
  } catch (error) {
    yield put(deleteProductFailure(error.message));
  }
}

function* retrieveProducts({ payload: { userId } }) {
  try {
    let reference;

    if (userId === null) {
      reference = yield firestore
        .collection("products")
        .orderBy("createdAt", "desc");
    } else {
      reference = yield firestore
        .collection("products")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc");
    }

    const snapshot = yield reference.get();

    if (snapshot.empty) {
      yield put(retrieveProductsSuccess([]));
    } else {
      let products = [];

      snapshot.forEach((doc) => {
        let data = {
          ...doc.data(),
          id: doc.id,
          key: doc.id,
          totalAmount: doc.data().quantity * doc.data().price,
        };

        products.push(data);
      });

      yield put(retrieveProductsSuccess(products));
    }
  } catch (error) {
    yield put(retrieveProductsFailure(error.message));
  }
}

function* updateProductCount({ payload: { id, quantity, isDone } }) {
  try {
    const reference = yield firestore.collection("products").doc(id);

    yield reference.update({
      id,
      quantity,
      isDone,
    });

    yield retrieveProducts();
    yield put(updateProductCountSuccess());
  } catch (error) {
    yield put(updateProductCountFailure(error.message));
  }
}

function* updateProduct({
  payload: {
    cropName,
    nativeName,
    price,
    units,
    quantity,
    expirationDate,
    imageFile,
    id,
    userId,
    firstName,
    lastName,
    farmAddress,
  },
}) {
  try {
    const reference = yield firestore.collection("products").doc(id);

    if (imageFile === undefined || imageFile === null) {
      yield reference.update({
        cropName,
        nativeName,
        price,
        units,
        quantity,
        expirationDate,
        id,
        userId,
        firstName,
        lastName,
        farmAddress,
      });

      yield retrieveProducts();
      yield put(updateProductSuccess());
    } else {
      yield storage.ref(`/products/${id}/${imageFile.name}`).put(imageFile);

      const imageUrl = yield storage
        .ref(`products/${id}`)
        .child(imageFile.name)
        .getDownloadURL();

      yield reference.update({
        cropName,
        nativeName,
        price,
        units,
        quantity,
        expirationDate,
        id,
        imageUrl,
        userId,
        firstName,
        lastName,
        farmAddress,
      });

      yield retrieveProducts();
      yield put(updateProductSuccess());
    }
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}

function* onAddProductStart() {
  yield takeLatest(ProductsActionsTypes.ADD_PRODUCT_START, addProduct);
}

function* onDeleteProductStart() {
  yield takeLatest(ProductsActionsTypes.DELETE_PRODUCT_START, deleteProduct);
}

function* onRetrieveProductStart() {
  yield takeLatest(
    ProductsActionsTypes.RETRIEVE_PRODUCTS_START,
    retrieveProducts
  );
}

function* onUpdateProductStart() {
  yield takeLatest(ProductsActionsTypes.UPDATE_PRODUCT_START, updateProduct);
}

function* onUpdateProductCountStart() {
  yield takeLatest(
    ProductsActionsTypes.UPDATE_PRODUCT_COUNT_START,
    updateProductCount
  );
}

export function* productsSaga() {
  yield all([
    call(onAddProductStart),
    call(onDeleteProductStart),
    call(onRetrieveProductStart),
    call(onUpdateProductStart),
    call(onUpdateProductCountStart),
  ]);
}
