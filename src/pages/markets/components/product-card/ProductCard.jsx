import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import Tooltip from "antd/es/tooltip";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { CardContainer } from "./ProductCard.styles";
import { selectCurrentUser } from "../../../../redux/user/user.selectors";
import ProductModal from "../product-modal/ProductModal";

const ProductCard = ({ product, user }) => {
  const [actions, setActions] = useState([]);
  const [type, setType] = useState();
  const [visible, setVisible] = useState(false);

  const { businessName, imageUrl, name, price, quantity } = product || {};

  const onAddSetVisible = () => {
    setVisible(true);
    setType("add");
  };

  const onMoreSetVisible = (visible) => {
    setVisible(true);
    setType("more");
  };

  useEffect(() => {
    if (user) {
      const { type } = user || {};

      if (type === "Owner") {
        setActions([
          <Tooltip placement="top" title={"See more details"}>
            <MoreOutlined key="details" />
          </Tooltip>,
        ]);
      } else {
        setActions([
          <Tooltip placement="top" title={"Buy product"}>
            <PlusOutlined onClick={onAddSetVisible} key="add" />
          </Tooltip>,
          <Tooltip placement="top" title={"See more details"}>
            <MoreOutlined onClick={onMoreSetVisible} key="details" />
          </Tooltip>,
        ]);
      }
    }
  }, [user]);

  return (
    <CardContainer>
      <Card
        style={{ width: 300 }}
        cover={<img alt={name} src={imageUrl} />}
        actions={actions}
      >
        <Meta title={name} description={"Business Name: " + businessName} />
        <br />
        <Meta
          title={"P" + parseInt(price).toFixed(2)}
          description={"Quantity: " + quantity}
        />
      </Card>
      {visible && (
        <ProductModal
          data={product}
          visible={visible}
          setVisible={setVisible}
          type={type}
        />
      )}
    </CardContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps)(ProductCard);
