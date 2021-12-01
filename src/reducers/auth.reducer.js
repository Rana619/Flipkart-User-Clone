import { authConstants } from "../actions/constants";

const initState = {
   token : null,
   user : {
     firstName : '',
     lastName : '',
     email : '',
     picture : ''
   },
   authenticateFail : false,
   authenticate : false,
   authenticating : false,
};

export default (state = initState, action) => {
    switch(action.type){
          case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating : true,
                authenticateFail : false,
            }
            break;
          case authConstants.LOGIN_SUCCESS:
            state = {
              ...state,
              user : action.payload.user,
              token : action.payload.token,
              authenticate : true,
              authenticating : false,
              authenticateFail : false,
            }
            break;
          case authConstants.LOGIN_FAILURE :
            state = {
              ...state,
              authenticateFail : true,
              authenticating : false,
            }
            break;
          case authConstants.LOGOUT_REQUEST:
            state ={
              ...initState
            }
            break;
          case authConstants.LOGOUT_SUCCESS:
            state ={
              ...initState
            }
            break;
          case authConstants.LOGOUT_FAILURE:
            state ={
              ...state,
              error : action.payload.error,
            }
            break;
      }
      return state;
}