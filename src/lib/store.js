import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import companySaga from "../features/company/state/company-sagas";
import contractSaga from "../features/contracts/state/contract-sagas";
import companyReducer from "../features/company/state/company-slice";
import contractReducer from "../features/contracts/state/contract-slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    contracts: contractReducer,
    companies: companyReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(contractSaga);
sagaMiddleware.run(companySaga);
