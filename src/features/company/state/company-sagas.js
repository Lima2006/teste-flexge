import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../lib/api";
import {
  addCompanyFailure,
  addCompanyRequest,
  addCompanySuccess,
  deleteCompanyFailure,
  deleteCompanySuccess,
  fetchCompaniesFailure,
  fetchCompaniesRequest,
  fetchCompaniesSuccess,
} from "./company-slice";
import { deleteContractRequest } from "../../contracts/state/contract-slice";

function* fetchCompanies(action) {
  try {
    const response = yield call(api.get, "/companies", {
      params: { page: action.payload.page, limit: action.payload.pageSize },
    });
    yield put(fetchCompaniesSuccess(response.data));
  } catch (error) {
    yield put(fetchCompaniesFailure(error.message));
  }
}

function* addCompany(action) {
  try {
    const response = yield call(api.post, "/companies", action.payload);
    yield put(addCompanySuccess(response.data));
  } catch (error) {
    yield put(addCompanyFailure(error.message));
  }
}

function* deleteContract(action) {
  try {
    yield call(api.delete, `/companies/${action.payload}`);
    yield put(deleteCompanySuccess(action.payload));
  } catch (error) {
    yield put(deleteCompanyFailure(error.message));
  }
}

export default function* contractSaga() {
  yield takeLatest(fetchCompaniesRequest.type, fetchCompanies);
  yield takeLatest(addCompanyRequest.type, addCompany);
  yield takeLatest(deleteContractRequest.type, deleteContract);
}
