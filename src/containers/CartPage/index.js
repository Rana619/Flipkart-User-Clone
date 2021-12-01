import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getCartItems, removeCartItem } from '../../actions';
import Layout from '../../components/Layout'
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import Card from '../../components/UI/Card';
import CartItem from './Cartitem';
import './style.css';

function CardPage(props) {

  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems])

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  function onQuantityIncrement(_id, qty) {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  }

  function onQuantityDecrement(_id, qty) {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  }

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };
 

  if(props.onlyCartItems){
    return(
      <>
          {
            Object.keys(cartItems).map((key, index) =>
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            )
          }
      </>
    );
  }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start", marginTop : "20px" }} >
        <Card
          headerLeft={`MY Cart`}
          headerRight={<div>Deliver</div>}
        >
          {
            Object.keys(cartItems).map((key, index) =>
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}  
                onRemoveCartItem={onRemoveCartItem}
              />
            )
          }

          <div style={{
            width: '100%',
            display: 'flex',
            backgroundColor: "#ffffff",
            justifyContent: 'flex-end',
            boxShadow: '0 0 10px 10px #eee',
            padding: '10px 0',
            boxSizing: 'border-box'
          }}
          >
            <div style={{ widht: '250px' }} >
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push('/checkout')}
              />
            </div>
          </div>

        </Card>
        <PriceDetails 
           totalItem={Object.keys(cart.cartItems).reduce(function(qty,key){
              return qty + cart.cartItems[key].qty
           }, 0)}
           totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) =>{
             const { price, qty } = cart.cartItems[key];
             return totalPrice + price*qty;
           }, 0)}
           margin="0px"
           marginLeft="15px"
        />
      </div>
    </Layout>
  )
}

export default CardPage
