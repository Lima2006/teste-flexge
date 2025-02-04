import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: [],
  totalContracts: 0,
  isLoading: false,
  error: null,
};

// Substitui o React.useReducer
const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    fetchContractsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchContractsSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts = action.payload.contracts;
      state.totalContracts = action.payload.total;
    },
    fetchContractsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchSingleContractRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchSingleContractSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts = [action.payload];
    },
    fetchSingleContractFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addContractRequest: (state) => {
      state.isLoading = true;
    },
    addContractSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts.push(action.payload);
    },
    addContractFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateContractRequest: (state) => {
      state.isLoading = true;
    },
    updateContractSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts.map((contract) => {
        if (contract._id !== action.payload._id) {
          return action.payload;
        }
        return contract;
      });
    },
    updateContractFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteContractRequest: (state) => {
      state.isLoading = true;
    },
    deleteContractSuccess: (state, action) => {
      state.isLoading = false;
      state.contracts = state.contracts.filter(
        (contract) => contract._id !== action.payload
      );
    },
    deleteContractFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchContractsRequest,
  fetchContractsSuccess,
  fetchContractsFailure,
  fetchSingleContractRequest,
  fetchSingleContractSuccess,
  fetchSingleContractFailure,
  addContractRequest,
  addContractSuccess,
  addContractFailure,
  updateContractRequest,
  updateContractSuccess,
  updateContractFailure,
  deleteContractRequest,
  deleteContractSuccess,
  deleteContractFailure,
} = contractSlice.actions;

export default contractSlice.reducer;
