import { PlusOutlined } from "@ant-design/icons";
import { Button, Layout, Space, Table } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Header from "../../core/components/header";
import ProtectedRoute from "../../core/components/protected-route";
import SearchFilters from "../components/search-filters";
import {
  deleteContractRequest,
  fetchContractsRequest,
} from "../state/contract-slice";

const ContractsScreen = () => {
  document.title = "Contracts";
  const { contracts, isLoading, totalContracts } = useSelector(
    (state) => state.contracts
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: totalContracts,
  });
  const [sorting, setSorting] = useState({});
  const [search, setSearch] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      fetchContractsRequest({
        page: pagination.current,
        pageSize: pagination.pageSize,
        sortBy: sorting.dataIndex,
        order: sorting.order === "ascend" ? "asc" : "desc",
        documentNumber: search.documentNumber,
        socialReason: search.socialReason,
        company: search.company,
      })
    );
  }, [dispatch, pagination, sorting, search]);

  const handleTableChange = (pagination, _, sorting) => {
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
      width: 200,
    },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <Header title="Contracts" />
        <Layout.Content className="px-8 py-4">
          <div className="flex justify-end">
            <Button
              type="primary"
              onClick={() => navigate("/contracts/new")}
              icon={<PlusOutlined />}
            >
              New Contract
            </Button>
          </div>
          <SearchFilters onFinish={setSearch} />
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
