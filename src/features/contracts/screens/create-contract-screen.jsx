import { Layout } from "antd";
import React from "react";
import ProtectedRoute from "../../core/components/protected-route";
import Header from "../../core/components/header";
import ContractForm from "../components/contract-form";
import { useDispatch } from "react-redux";
import { addContractRequest } from "../state/contract-slice";
import { useNavigate } from "react-router";

const CreateContractScreen = () => {
  document.title = "Create Contract";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <ProtectedRoute>
      <Layout>
        <Header title="Create Contract" />
        <ContractForm
          className="px-8 py-4"
          onSubmit={(values) => {
            dispatch(addContractRequest(values));
            navigate("/");
          }}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateContractScreen;
