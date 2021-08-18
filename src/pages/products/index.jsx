import React from "react";

export const AddProductPage = React.lazy(() =>
  import("./components/AddProduct")
);
export const ProductsPage = React.lazy(() => import("./components/Products"));
