import axios from "../helper/axios";
import { homePageConstants } from "./constants";

 
export const getHomePage = () =>{
    return async dispatch =>{
          dispatch({ type : homePageConstants.GET_HOMEPAGE_REQUEST })
           const res = await axios.get(`/getHomePage`);
           if(res.status === 200){
               const { homePage } = res.data;
               dispatch({
                   type : homePageConstants.GET_HOMEPAGE_SUCCESS,
                   payload : { homePage }
               });
           } else {
               dispatch({
                   type : homePageConstants.GET_HOMEPAGE_FAILURE,
                   payload : { error : res.data.error }
               });
           }
    }
}

 


