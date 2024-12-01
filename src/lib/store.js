import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import contractSaga from "../features/contracts/state/contract-sagas";
import contractReducer from "../features/contracts/state/contract-slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    contracts: contractReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(contractSaga);
