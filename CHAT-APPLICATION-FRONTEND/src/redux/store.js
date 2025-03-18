import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slice/commonSlice";

export default configureStore({
  reducer: { common: commonReducer },
});
