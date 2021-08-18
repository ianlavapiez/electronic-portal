import { all, call } from "redux-saga/effects";
import { productsSaga } from "./products/products.sagas";
import { userSaga } from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(productsSaga), call(userSaga)]);
}
