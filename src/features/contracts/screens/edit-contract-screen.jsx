import { Layout, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Header from "../../core/components/header";
import ProtectedRoute from "../../core/components/protected-route";
import ContractForm from "../components/contract-form";
import {
  fetchSingleContractRequest,
  updateContractRequest,
} from "../state/contract-slice";

const EditContractScreen = () => {
  document.title = "Edit Contract";
  const { contractId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { contracts, isLoading, error } = useSelector(
    (state) => state.contracts
  );

  React.useEffect(() => {
    dispatch(fetchSingleContractRequest(contractId));
  }, [dispatch, contractId]);

  return (
    <ProtectedRoute>
      <Layout>
        <Header title="Create Contract" />
        <ContractForm
          initialValues={contracts?.find(({ _id }) => _id === contractId)}
          className="px-8 py-4"
          onSubmit={(values) => {
            dispatch(updateContractRequest([contractId, values]));
            if (!isLoading) {
              if (!error) {
                message.success("Contract successfully edited");
              } else {
                message.error("Error on edit contract");
              }
              navigate("/");
            }
          }}
        />
      </Layout>
    </ProtectedRoute>
  );
};

export default EditContractScreen;
