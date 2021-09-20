import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Input from "antd/es/input";
import Menu from "antd/es/menu";
import notification from "antd/es/notification";
import Space from "antd/es/space";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
import Highlighter from "react-highlight-words";
import {
  CheckOutlined,
  CloseOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { TransactionsTableContainer } from "../TransactionLogs.styles";
import {
  selectAllTransactions,
  selectError,
  selectIsActionLoading,
  selectIsLoading,
  selectIsSuccessful,
} from "../../../redux/transactions/transactions.selectors";
import { fireAlertWithConfirmation } from "../../../components/sweetalert/SweetAlert";
import Spinner from "../../../components/spinner/Spinner";
import {
  retrieveTransactionsStart,
  updateTransactionStart,
} from "../../../redux/transactions/transactions.actions";
import { selectCurrentUser } from "../../../redux/user/user.selectors";

export class TransactionTable extends React.Component {
  state = {
    transactions: [],
    searchedColumn: "",
    searchText: "",
  };

  componentDidMount() {
    const { retrieveTransactionsStart } = this.props;

    retrieveTransactionsStart();
  }

  componentDidUpdate(previousProps) {
    const { error, isSuccessful } = this.props;

    if (this.props.transactions !== previousProps.transactions) {
      this.setState({
        transactions: this.props.transactions,
      });
    }

    if (isSuccessful) {
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
      description: "You have successfully updated a transaction!",
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

  cancelTransaction = (data) => {
    const { updateTransactionStart } = this.props;
    const fetchedData = data;

    fetchedData.status = "cancelled";

    fireAlertWithConfirmation(
      `Are you sure you want to cancel the selected transaction? This action can't be UNDONE!`,
      "The selected transaction has been successfully cancelled!",
      (confirmed) => {
        if (confirmed) {
          updateTransactionStart(fetchedData);
        } else {
          return false;
        }
      }
    );
  };

  completeTransaction = (data) => {
    const { updateTransactionStart } = this.props;
    const fetchedData = data;

    fetchedData.status = "completed";

    fireAlertWithConfirmation(
      `Are you sure you want to complete the transaction?`,
      "The selected transaction has been successfully completed!",
      (confirmed) => {
        if (confirmed) {
          updateTransactionStart(fetchedData);
        } else {
          return false;
        }
      }
    );
  };

  render() {
    const { transactions } = this.state;
    const { isActionLoading, isLoading, user } = this.props;
    const { type } = user || {};

    const columns = [
      {
        title: "Business Name",
        dataIndex: "businessName",
        key: "businessName",
        ...this.getColumnSearchProps("businessName"),
      },
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Business Address",
        dataIndex: "businessAddress",
        key: "businessAddress",
        ...this.getColumnSearchProps("businessAddress"),
      },
      {
        title: "Contact Number",
        dataIndex: "contactNumber",
        key: "contactNumber",
      },
      {
        title: "Telephone Number",
        dataIndex: "telephoneNumber",
        key: "telephoneNumber",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price ",
        render: (data) => "P" + parseInt(data, 10).toFixed(2),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Total Amount",
        dataIndex: "quantity",
        key: "quantity",
        render: (data, row) => {
          const totalAmount = parseInt(data) * parseInt(row.price);

          return `P${totalAmount.toFixed(2)}`;
        },
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (data) => {
          if (data === "pending") {
            return <Tag color="cyan">{data.toUpperCase()}</Tag>;
          } else if (data === "completed") {
            return <Tag color="green">{data.toUpperCase()}</Tag>;
          } else if (data === "cancelled") {
            return <Tag color="red">{data.toUpperCase()}</Tag>;
          }
        },
      },
      {
        title: "Action",
        key: "action",
        render: (data) => {
          const { status } = data || {};

          if (status === "completed" || status === "cancelled") {
            return null;
          } else {
            return (
              <span>
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => this.cancelTransaction(data)}>
                        <CloseOutlined /> Cancel
                      </Menu.Item>
                      {type === "Owner" && (
                        <Menu.Item
                          onClick={() => this.deleteDownloadable(data)}
                        >
                          <CheckOutlined /> Complete
                        </Menu.Item>
                      )}
                    </Menu>
                  }
                  trigger={["click"]}
                >
                  <Button type="default" icon={<MoreOutlined />} />
                </Dropdown>
              </span>
            );
          }
        },
      },
    ];

    if (isActionLoading || isLoading) {
      return (
        <Fragment>
          <TransactionsTableContainer>
            <Spinner />
          </TransactionsTableContainer>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Table
          style={{ height: "70vh", margin: 20 }}
          columns={columns}
          dataSource={
            transactions &&
            transactions.filter((transaction) => {
              if (user.type === "Consumer") {
                return transaction.buyerId === user.id;
              } else {
                return transaction.userId === user.id;
              }
            })
          }
          pagination={{ defaultPageSize: 6 }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isActionLoading: selectIsActionLoading,
  isLoading: selectIsLoading,
  transactions: selectAllTransactions,
  error: selectError,
  user: selectCurrentUser,
  isSuccessful: selectIsSuccessful,
});

const mapDispatchToProps = (dispatch) => ({
  retrieveTransactionsStart: () => dispatch(retrieveTransactionsStart()),
  updateTransactionStart: (data) => dispatch(updateTransactionStart(data)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TransactionTable)
);
