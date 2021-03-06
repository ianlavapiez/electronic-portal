import ProductsActionsTypes from "./products.types";

export const addProductStart = (data) => ({
  type: ProductsActionsTypes.ADD_PRODUCT_START,
  payload: data,
});

export const addProductSuccess = () => ({
  type: ProductsActionsTypes.ADD_PRODUCT_SUCCESS,
});

export const addProductFailure = (error) => ({
  type: ProductsActionsTypes.ADD_PRODUCT_FAILURE,
  payload: error,
});

export const addProductRestart = () => ({
  type: ProductsActionsTypes.ADD_PRODUCT_RESTART,
});

export const deleteProductStart = (data) => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_START,
  payload: data,
});

export const deleteProductSuccess = () => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailure = (error) => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_FAILURE,
  payload: error,
});

export const deleteProductRestart = () => ({
  type: ProductsActionsTypes.DELETE_PRODUCT_RESTART,
});

export const retrieveProductsStart = (data) => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_START,
  payload: data,
});

export const retrieveProductsSuccess = (data) => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_SUCCESS,
  payload: data,
});

export const retrieveProductsFailure = (error) => ({
  type: ProductsActionsTypes.RETRIEVE_PRODUCTS_FAILURE,
  payload: error,
});

export const updateProductStart = (data) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_START,
  payload: data,
});

export const updateProductSuccess = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS,
});

export const updateProductFailure = (error) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_FAILURE,
  payload: error,
});

export const updateProductRestart = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_RESTART,
});

export const updateProductCountStart = (data) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_COUNT_START,
  payload: data,
});

export const updateProductCountSuccess = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_COUNT_SUCCESS,
});

export const updateProductCountFailure = (error) => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_COUNT_FAILURE,
  payload: error,
});

export const updateProductCountRestart = () => ({
  type: ProductsActionsTypes.UPDATE_PRODUCT_COUNT_RESTART,
});
