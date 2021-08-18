import React from "react";
import { useHistory } from "react-router-dom";
import {
  MainProductContainer,
  ProductButton,
  ProductTitle,
} from "./Products.styles";
import ProductTable from "./ProductTable";

const TransactionsPage = () => {
  const history = useHistory();

  const goToAddProduct = () => history.push("/add-product");

  return (
    <MainProductContainer>
      <ProductTitle level={2}>Your Products</ProductTitle>
      <ProductButton onClick={goToAddProduct}>Add Product</ProductButton>
      <ProductTable />
    </MainProductContainer>
  );
};

export default TransactionsPage;
