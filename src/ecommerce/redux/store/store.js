import { configureStore } from "@reduxjs/toolkit";
import productosSlices from "../slices/productosSlices";

const store = configureStore({
    reducer: {
      productosReducer: productosSlices,
    },
  });
  
  export default store;