import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Button from "antd/es/button";
import Input from "antd/es/input";
import notification from "antd/es/notification";
import Space from "antd/es/space";
import Table from "antd/es/table";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { ProductsTableContainer } from "./Products.styles";
import { retrieveProductsStart } from "../../../redux/products/products.actions";
import {
  selectAllProducts,
  selectError,
  selectIsActionLoading,
  selectIsLoading,
} from "../../../redux/products/products.selectors";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { fireAlertWithConfirmation } from "../../../components/sweetalert/SweetAlert";
import Spinner from "../../../components/spinner/Spinner";

export class ProductTable extends React.Component {
  state = {
    products: [],
    searchedColumn: "",
    searchText: "",
  };

  componentDidMount() {
    const { retrieveProductsStart, user } = this.props;

    const { id } = user || {};

    retrieveProductsStart({ userId: id });
  }

  componentDidUpdate(previousProps) {
    const { updateProductCountRestart, error, isSuccessful } = this.props;

    if (this.props.products !== previousProps.products) {
      this.setState({
        products: this.props.products,
      });
    }

    if (isSuccessful) {
      updateProductCountRestart();
      this.openNotificationSuccess();
    }

    if (error !== null) {
      this.openNotificationError(error);
    }
  }

  openNotificationSuccess = () => {
    notification.success({
      message: `Success!`,
      duration: 5,
      description: "You have successfully updated a product!",
      placement: "topRight",
    });
  };

  openNotificationError = (message) => {
    notification.error({
      message: `Uh-oh!`,
      duration: 5,
      description: message,
      placement: "topRight",
    });
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => (this.searchInput = node)}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  updateTransaction = (data, { isCancelled, isPending, isDone }) => {
    const { updateTransactionStart, user } = this.props;
    const { id: userId, type } = user || {};

    fireAlertWithConfirmation(
      `Are you sure you want to delete the product?`,
      "The selected product has been successfully deleted!",
      (confirmed) => {
        if (confirmed) {
          updateTransactionStart({
            isCancelled,
            isPending,
            isDone,
            id: data.id,
            userId,
            type,
          });
        } else {
          return false;
        }
      }
    );
  };

  render() {
    const { products } = this.state;
    const { isActionLoading, isLoading } = this.props;

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ...this.getColumnSearchProps("description"),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (data) => "P" + parseInt(data, 10).toFixed(2),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (data) => "P" + parseInt(data, 10).toFixed(2),
      },
    ];

    if (isActionLoading || isLoading) {
      return (
        <Fragment>
          <ProductsTableContainer>
            <Spinner />
          </ProductsTableContainer>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Table
          style={{ height: "70vh", margin: 20 }}
          columns={columns}
          dataSource={products && products}
          pagination={{ defaultPageSize: 6 }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectError,
  isActionLoading: selectIsActionLoading,
  isLoading: selectIsLoading,
  products: selectAllProducts,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveProductsStart: (data) => dispatch(retrieveProductsStart(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductTable)
);
