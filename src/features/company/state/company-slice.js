import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  totalCompanies: 0,
  isLoading: false,
  error: null,
};

// Like the React Reducer
const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    fetchCompaniesRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCompaniesSuccess: (state, action) => {
      state.isLoading = false;
      state.companies = action.payload.companies;
      state.totalCompanies = action.payload.total;
    },
    fetchCompaniesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addCompanyRequest: (state) => {
      state.isLoading = true;
    },
    addCompanySuccess: (state, action) => {
      state.isLoading = false;
      state.companies.push(action.payload);
    },
    addCompanyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteCompanyRequest: (state) => {
      state.isLoading = true;
    },
    deleteCompanySuccess: (state, action) => {
      state.isLoading = false;
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload
      );
    },
    deleteCompanyFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCompaniesRequest,
  fetchCompaniesSuccess,
  fetchCompaniesFailure,
  addCompanyRequest,
  addCompanySuccess,
  addCompanyFailure,
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFailure,
} = companiesSlice.actions;

export default companiesSlice.reducer;
