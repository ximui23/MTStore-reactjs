import Axios from "axios";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants"

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });

    try {
        //getting data from backend
        const { data } = await Axios.get('/api/products');
        //dispatch action: change state of redux
        //base on this we can update the homescreen and show products
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })
    }
}

export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });

    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, payload: data
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            //error.response is the message from backend,
            //error.message is the general error
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }

};

export const createProduct = () => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const { userSignin: { userInfo } } = getState();

    try {
        const { data } = await Axios.post('/api/products', {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
        //data.product == createdProduct from backend (inside productRouter)

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
};