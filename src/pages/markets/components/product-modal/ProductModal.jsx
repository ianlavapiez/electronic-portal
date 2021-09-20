import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import { fireAlert } from "../../../../components/sweetalert/SweetAlert";
import { selectCurrentUser } from "../../../../redux/user/user.selectors";
import {
  addTransactionStart,
  addTransactionRestart,
} from "../../../../redux/transactions/transactions.actions";
import {
  selectError,
  selectIsActionLoading,
  selectIsSuccessful,
} from "../../../../redux/transactions/transactions.selectors";

const ProductModal = ({
  addTransactionRestart,
  addTransactionStart,
  data,
  error,
  isActionLoading,
  setVisible,
  type,
  visible,
  user,
  isSuccessful,
}) => {
  useEffect(() => {
    if (isSuccessful) {
      addTransactionRestart();
      setVisible(false);
      fireAlert("Successfully bought the product!", "success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      if (error !== null) {
        addTransactionRestart();
        fireAlert(error, "error");
      }
    }
  }, [isSuccessful, addTransactionRestart, error, setVisible]);

  const onFinish = (values) => {
    if (type === "add") {
      const { id: buyerId } = user || {};
      const { quantity } = values;
      const {
        businessName,
        businessAddress,
        name,
        userId,
        price,
        telephoneNumber,
        contactNumber,
        quantity: dataQuantity,
        id,
      } = data || {};

      if (parseInt(quantity) > parseInt(dataQuantity)) {
        return fireAlert(
          `Available quantity is only at ${dataQuantity}, please try again.`,
          "error"
        );
      }

      addTransactionStart({
        businessAddress,
        buyerId,
        quantity,
        productId: id,
        businessName,
        name,
        userId,
        price,
        telephoneNumber,
        contactNumber,
        productQuantity: parseInt(dataQuantity) - parseInt(quantity),
      });
    } else {
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  return (
    <Modal
      destroyOnClose
      footer={null}
      title="Product Details"
      visible={visible}
      onCancel={handleCancel}
    >
      <Form {...layout} onFinish={onFinish}>
        <Input
          type="hidden"
          readOnly
          value={data ? data.id : ""}
          name="id"
          className="id"
        />
        <Form.Item
          label="Business Owner"
          name="businessName"
          initialValue={data ? data.businessName : ""}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Product Name"
          name="name"
          initialValue={data ? data.name : ""}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          initialValue={data ? "P" + parseInt(data.price).toFixed(2) : ""}
        >
          <Input readOnly />
        </Form.Item>
        {type === "add" ? null : (
          <>
            <Form.Item
              label="Business Address"
              name="businessAddress"
              initialValue={data ? data.businessAddress : ""}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Contact Number"
              name="contactNumber"
              initialValue={data ? data.contactNumber : ""}
            >
              <Input readOnly />
            </Form.Item>
            <Form.Item
              label="Telephone Number"
              name="telephoneNumber"
              initialValue={data ? data.telephoneNumber : ""}
            >
              <Input readOnly />
            </Form.Item>
          </>
        )}
        {type === "add" ? (
          <>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            label="Quantity Left"
            name="quantityLeft"
            initialValue={data ? data.quantity : ""}
          >
            <Input readOnly />
          </Form.Item>
        )}
        <Form.Item>
          <Button
            loading={isActionLoading}
            style={{
              borderRadius: 5,
              border: "none",
            }}
            type="primary"
            htmlType="submit"
          >
            {type === "add" ? "Buy Product" : "Close"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
  isActionLoading: selectIsActionLoading,
  error: selectError,
  isSuccessful: selectIsSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  addTransactionStart: (data) => dispatch(addTransactionStart(data)),
  addTransactionRestart: () => dispatch(addTransactionRestart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
