import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../core/components/header";
import ProtectedRoute from "../../core/components/protected-route";
import {
  deleteContractRequest,
  fetchContractsRequest,
} from "../state/contract-slice";

const ContractsScreen = () => {
  const { contracts, isLoading, totalContracts } = useSelector(
    (state) => state.contracts
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: totalContracts,
  });
  const [sorting, setSorting] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(sorting)
    dispatch(
      fetchContractsRequest({
        page: pagination.current,
        pageSize: pagination.pageSize,
        sortBy: sorting.dataIndex,
        order: sorting.order === "ascend" ? "asc" : "desc",
      })
    );
  }, [dispatch, pagination, sorting]);

  const handleTableChange = (pagination, filters, sorting) => {
    setPagination(pagination);
    setSorting(sorting);
  };

  const columns = [
    {
      title: "Document Number",
      dataIndex: "documentNumber",
      key: "documentNumber",
    },
    {
      title: "Social Reason",
      dataIndex: "socialReason",
      key: "socialReason",
      sorter: true,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: true,
      render: (company) => company?.name,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => navigate(`/contracts/edit/${record._id}`)}>
            Edit
          </Button>
          <Button
            danger
            onClick={() => dispatch(deleteContractRequest(record._id))}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <Header title="Contracts" />
        <Layout.Content className="px-8">
          <div className="flex justify-start py-4">
            <Button
              type="primary"
              onClick={() => navigate("/contracts/new")}
              icon={<PlusOutlined />}
            >
              Create New
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={contracts}
            rowKey={(record) => record._id}
            loading={isLoading}
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Layout.Content>
      </Layout>
    </ProtectedRoute>
  );
};

export default ContractsScreen;
