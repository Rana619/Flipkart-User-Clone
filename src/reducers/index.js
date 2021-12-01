import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import homePageReducer from './homePage.reducer';
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    category : categoryReducer,
    product : productReducer,
    auth : authReducer,
    cart : cartReducer,
    user : userReducer,
    homePage : homePageReducer
});

export default rootReducer;
 