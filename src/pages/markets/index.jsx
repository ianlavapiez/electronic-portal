import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAllProducts,
  selectIsLoading,
} from "../../redux/products/products.selectors";
import { retrieveProductsStart } from "../../redux/products/products.actions";
import { ProductCard } from "./components";
import {
  MarketsContainer,
  OverviewTitle,
  ProductContainer,
} from "./Markets.styles";
import Spinner from "../../components/spinner/Spinner";

const MarketsPage = ({ loading, products, retrieveProductsStart }) => {
  useEffect(() => {
    retrieveProductsStart();
  }, [retrieveProductsStart]);

  if (loading) {
    return (
      <MarketsContainer>
        <Spinner />
      </MarketsContainer>
    );
  }

  return (
    <MarketsContainer>
      <OverviewTitle>Marketplace</OverviewTitle>
      <ProductContainer>
        {products.length > 0
          ? products
              .filter((product) => product.quantity > 0)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          : null}
      </ProductContainer>
    </MarketsContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectIsLoading,
  products: selectAllProducts,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveProductsStart: () =>
    dispatch(retrieveProductsStart({ userId: null })),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  MarketsPage
);
