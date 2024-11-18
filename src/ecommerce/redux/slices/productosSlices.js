import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    //DATA
	productosDataArr: [],
}
const productosSlice = createSlice({
	name: 'PRODUCTOS',
	initialState,
	reducers: {
		SET_DATA_PRODUCTOS: (state, action) => { 			
                        console.log('<<REDUX-REDUCER>>:<<SET_DATA_PRODUCTOS>>', action.payload);
			state.productosDataArr = action.payload
		}
    }
}
);
export const {
	SET_DATA_PRODUCTOS,
    //ADD_PRODUCT_SELECTED,
    //SWITCH_STATE,
} = productosSlice.actions;
export default productosSlice.reducer;