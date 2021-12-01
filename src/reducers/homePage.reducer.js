import { homePageConstants } from "../actions/constants";

const initialState = {
    error : null,
    loading : false,
    homePage : []
};

export default (state = initialState, action) =>{
    switch(action.type){
        case homePageConstants.GET_HOMEPAGE_REQUEST :
            state = {
                 ...state,
                loading : true
            }
            break;
        case homePageConstants.GET_HOMEPAGE_SUCCESS :
            state ={
                ...state,
                homePage : action.payload.homePage,
                loading : false
            }
            break;
        case homePageConstants.GET_HOMEPAGE_FAILURE : 
            state = {
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;
    }
    return state;
}


