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
  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchContractsRequest({
        page: pagination.current,
        pageSize: pagination.pageSize,
      })
    );
  }, [dispatch, pagination.current]);

  const handleTableChange = (pagination) => {
    setPagination({ ...pagination });
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
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
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