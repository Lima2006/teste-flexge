import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchContractsRequest,
  fetchContractsSuccess,
  fetchContractsFailure,
  addContractRequest,
  addContractSuccess,
  addContractFailure,
  deleteContractRequest,
  deleteContractSuccess,
  deleteContractFailure,
} from "./contract-slice";
import { api } from "../../../lib/api";

function* fetchContracts(action) {
  try {
    const response = yield call(api.get, "/contracts", {
      params: {
        page: action.payload.page,
        limit: action.payload.pageSize,
        sortBy: action.payload.sortBy,
        order: action.payload.order,
      },
    });
    yield put(fetchContractsSuccess(response.data));
  } catch (error) {
    yield put(fetchContractsFailure(error.message));
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
  yield takeLatest(addContractRequest.type, addContract);
  yield takeLatest(deleteContractRequest.type, deleteContract);
}
