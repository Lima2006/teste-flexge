import { call, put, takeLatest } from "redux-saga/effects";
import { api } from "../../../lib/api";
import {
  addContractFailure,
  addContractRequest,
  addContractSuccess,
  deleteContractFailure,
  deleteContractRequest,
  deleteContractSuccess,
  fetchContractsFailure,
  fetchContractsRequest,
  fetchContractsSuccess,
  fetchSingleContractFailure,
  fetchSingleContractRequest,
  fetchSingleContractSuccess,
  updateContractFailure,
  updateContractRequest,
  updateContractSuccess,
} from "./contract-slice";

function* fetchContracts(action) {
  try {
    const response = yield call(api.get, "/contracts", {
      params: {
        page: action.payload.page,
        limit: action.payload.pageSize,
        sortBy: action.payload.sortBy,
        order: action.payload.order,
        documentNumber: action.payload.documentNumber,
        socialReason: action.payload.socialReason,
        company: action.payload.company,
      },
    });
    yield put(fetchContractsSuccess(response.data));
  } catch (error) {
    yield put(fetchContractsFailure(error.message));
  }
}

function* fetchSingleContract(action) {
  try {
    const response = yield call(api.get, `/contracts/${action.payload}`);
    yield put(fetchSingleContractSuccess(response.data));
  } catch (error) {
    yield put(fetchSingleContractFailure(error.message));
  }
}

function* addContract(action) {
  try {
    const response = yield call(api.post, "/contracts", action.payload);
    yield put(addContractSuccess(response.data));
  } catch (error) {
    yield put(addContractFailure(error.message));
  }
}

function* updateContract(action) {
  try {
    const response = yield call(
      api.put,
      `/contracts/${action.payload[0]}`,
      action.payload[1]
    );
    console.log(response)
    yield put(updateContractSuccess(response.data.contract));
  } catch (error) {
    yield put(updateContractFailure(error.message));
  }
}

function* deleteContract(action) {
  try {
    yield call(api.delete, `/contracts/${action.payload}`);
    yield put(deleteContractSuccess(action.payload));
  } catch (error) {
    yield put(deleteContractFailure(error.message));
  }
}

export default function* contractSaga() {
  yield takeLatest(fetchContractsRequest.type, fetchContracts);
  yield takeLatest(fetchSingleContractRequest.type, fetchSingleContract);
  yield takeLatest(addContractRequest.type, addContract);
  yield takeLatest(updateContractRequest.type, updateContract);
  yield takeLatest(deleteContractRequest.type, deleteContract);
}
