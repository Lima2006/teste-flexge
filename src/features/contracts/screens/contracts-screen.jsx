import { Button, Layout, Space, Table, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { api } from "../../../lib/api";
import Header from "../../core/components/header";
import ProtectedRoute from "../../core/components/protected-route";
import { fetchContractsRequest } from "../state/contract-slice";

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
            Editar
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/contracts/${id}`);
      message.success("Contrato excluído com sucesso!");
      // fetchContracts(pagination.current);
    } catch (error) {
      message.error("Erro ao excluir contrato.");
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <Header />
        <h1>Consulta de Contratos</h1>
        <Button
          type="primary"
          onClick={() => navigate("/contracts/new")}
          style={{ marginBottom: 16 }}
        >
          Criar Novo Contrato
        </Button>
        <Table
          columns={columns}
          dataSource={contracts}
          rowKey={(record) => record._id}
          loading={isLoading}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default ContractsScreen;
