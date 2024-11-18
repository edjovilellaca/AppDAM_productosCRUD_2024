import { getProductosAll } from './actions/productsAction';
import { SET_DATA_PRODUCTOS } from './slices/productosSlices';

export const GET_DATA_START = () => {
    return async (dispatch, getState) => {
        dispatch(
            SET_DATA_PRODUCTOS(
                await getProductosAll(),
            )
        )
    };
};