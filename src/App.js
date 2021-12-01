import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import HomePage from './containers/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';
import MobileLaptopPage from './containers/ProductListPage/Mobile-LaptopPage';
import Spinner from './components/UI/spinner';
import SearchResult from './containers/SearchResult';
import AllProductsWithOffer from './containers/ShowProductsWithOffer';
import Footer from './containers/footer';
function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const category = useSelector( state => state.category );
  const product = useSelector((state) => state.product);
  const cart = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  useEffect(() =>{
    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
  } else {
    dispatch(getCartItems())
  }
  }, [auth.authenticate]);


  useEffect(()=>{
    dispatch(updateCart())
  },[auth.authenticate])

  return (
    <div className="App">
    {
      auth.authenticating && <Spinner />
    }
    {
     category.loading && <Spinner />
    }
    {
     product.loading && <Spinner />
    }
    {/* some problem with card spinner */}
    {
      cart.updatingCart && <Spinner />
    }
    {
      user.loading && <Spinner />
    }
    {
      user.orderFetching && <Spinner />
    }
      <Router>
          <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path="/cart" component={CartPage} />
              <Route path="/checkout" component={CheckoutPage} />
              <Route path="/searchResult/:searchItem" component={SearchResult} />
              <Route path="/allProducts/:slug" component={MobileLaptopPage} />
              <Route path="/allProductsWithOffer/:productWithOffer" component={AllProductsWithOffer} />
              <Route path="/account/orders" component={OrderPage} />
              <Route path="/order/details/:orderId" component={OrderDetailsPage} />
              <Route path="/:productSlug/:productId/p" component={ProductDetailsPage} />
              <Route path='/:slug' exact component={ProductListPage} />
          </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
