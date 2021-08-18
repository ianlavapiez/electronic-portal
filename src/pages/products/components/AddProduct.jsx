import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Form from "antd/es/form";
import notification from "antd/es/notification";
import {
  addProductStart,
  addProductRestart,
} from "../../../redux/products/products.actions";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import {
  selectError,
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../redux/products/products.selectors";
import {
  ProductButton,
  ProductContainer,
  ButtonContainer,
  Container,
  FormContainer,
  FormDivContainer,
  FormMainContainer,
  HeaderText,
  InputContainer,
} from "./Products.styles";

const AddProducts = ({
  addProductRestart,
  addProductStart,
  error,
  history,
  isLoading,
  isSuccessful,
  user,
}) => {
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (isSuccessful) {
      addProductRestart();
      openNotificationSuccess();
      return history.push("/your-products");
    } else {
      if (error !== null) {
        return openNotificationError(error);
      }
    }
  }, [history, isSuccessful, error, addProductRestart]);

  const openNotificationSuccess = () => {
    notification.success({
      message: `Success!`,
      duration: 5,
      description: "You have successfully added a new product!",
      placement: "topRight",
    });
  };

  const openNotificationError = (error) => {
    notification.error({
      message: `Uh-oh!`,
      duration: 5,
      description: error || "Something went wrong!",
      placement: "topRight",
    });
  };

  const handleUploading = async (e) => {
    const imageFile = e.target.files[0];

    setImageFile(imageFile);
  };

  const onFinish = ({ name, description, price, quantity }) => {
    const {
      id: userId,
      businessAddress,
      businessName,
      telephoneNumber,
      contactNumber,
    } = user || {};

    addProductStart({
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
    });
  };

  return (
    <Container>
      <ProductContainer>
        <HeaderText>
          Welcome owner! Please provide your services or products information
          here to be posted in the marketplace.
        </HeaderText>
        <FormContainer className="login-form" onFinish={onFinish}>
          <FormMainContainer>
            <FormDivContainer style={{ marginTop: "-35px" }}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input service or product name!",
                  },
                ]}
              >
                <InputContainer placeholder="Product or Service Name" />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input description!",
                  },
                ]}
              >
                <InputContainer placeholder="Description" />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input price!",
                  },
                ]}
              >
                <InputContainer placeholder="Price" type="number" />
              </Form.Item>
            </FormDivContainer>
            <FormDivContainer>
              <Form.Item
                name="quantity"
                rules={[
                  {
                    message: "Please input quantity!",
                    required: true,
                  },
                ]}
              >
                <InputContainer placeholder="Quantity" type="number" />
              </Form.Item>
              <Form.Item
                className="form-item"
                name="file"
                rules={[{ required: true, message: "Please upload an image!" }]}
              >
                <InputContainer
                  onChange={handleUploading}
                  placeholder="Upload supporting image"
                  type="file"
                />
              </Form.Item>
              <Form.Item>
                <ButtonContainer>
                  <ProductButton
                    className="login-form-button"
                    htmlType="submit"
                    loading={isLoading}
                    type="primary"
                  >
                    Add Product
                  </ProductButton>
                </ButtonContainer>
              </Form.Item>
            </FormDivContainer>
          </FormMainContainer>
        </FormContainer>
      </ProductContainer>
    </Container>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isLoading: selectIsActionLoading,
  isSuccessful: selectIsSuccessful,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  addProductRestart: () => dispatch(addProductRestart()),
  addProductStart: (data) => dispatch(addProductStart(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProducts)
);
