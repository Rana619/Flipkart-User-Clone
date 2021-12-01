import { authConstants, cartConstants } from "./constants"
import axios from "../helper/axios.js";

export const signup = (user) => {
    return async (dispatch) => {
      let res;
      try {
        dispatch({ type: authConstants.SIGNUP_REQUEST });
        res = await axios.post(`/signup`, user);
        if (res.status === 201) {
          dispatch({ type: authConstants.SIGNUP_SUCCESS });
          const { token, user } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        } else {
          const { error } = res.data;
          dispatch({ type: authConstants.SIGNUP_FAILURE, payload: { error } });
        }
      } catch (error) {
        dispatch({
          type: authConstants.SIGNUP_FAILURE,
          payload: { error },
        });
      }
    };
  };

export const login = (user) =>{
    return async (dispatch) =>{
        dispatch({ type : authConstants.LOGIN_REQUEST });
        const res = await axios.post('/signin', {
            ...user
        });
        if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type : authConstants.LOGIN_SUCCESS,
                payload : {
                    token, user
                }
            });
        } else {
            if(res.status === 204){
                dispatch({
                    type : authConstants.LOGIN_FAILURE,
                    payload : { res }
                });
            }
        }

    }
}

export const isUserLoggedIn = ()=>{
    return async dispatch =>{
      const token = localStorage.getItem('token');
      if(token){
          const user = JSON.parse( localStorage.getItem('user'));
        dispatch({
            type : authConstants.LOGIN_SUCCESS,
            payload : {
                token, user
            }
        });
      } else{
        dispatch({
            type : authConstants.LOGIN_FAILURE,
            payload : { error : 'Fail to login' }
        });
      }
    }
}

export const signout =  () =>{
    return async dispatch =>{
         dispatch({ type : authConstants.LOGOUT_REQUEST })
         localStorage.clear();
         dispatch({ type : authConstants.LOGOUT_SUCCESS })
         dispatch({ type : cartConstants.RESET_CART }); 
    }
}
