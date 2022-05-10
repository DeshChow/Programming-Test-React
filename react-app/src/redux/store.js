import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./slice/launchesSlice";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
