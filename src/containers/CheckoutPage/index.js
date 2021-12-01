import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrder, getAddress, getCartItems, getOrders } from '../../actions';
import Layout from '../../components/Layout'
import { Anchor, MaterialButton, MaterialInput } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import AddressForm from './AddressForm';
import CartPage from '../CartPage';
import './style.css'
import Card from '../../components/UI/Card';

import bhim from "../../images/logo/bim.png";
import paytm from "../../images/logo/paytm.png";
import gpay from "../../images/logo/gpay.png";
import phonePay from "../../images/logo/phonepay.jpg";

function CheckoutStep(props) {
    return (
        <div className="checkoutStep" style={{ marginTop : "10px" }} >
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && 'active'}`} >
                <div>
                    <span className="stepNumber" >{props.stepNumber}</span>
                    <span className="stepTitle" >{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    )
}

const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">{adr.addressType}</span>
                                <span className="addressMobileNumber">{adr.mobileNumber}</span>
                            </div>
                            {adr.selected && (
                                <Anchor
                                    name="EDIT"
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                        fontWeight: "500",
                                        color: "#2874f0",
                                    }}
                                />
                            )}
                        </div>
                        <div className="fullAddress">
                            {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
                        </div>
                        {adr.selected && (
                            <MaterialButton
                                title="DELIVERY HERE"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                    width: "200px",
                                    margin: "10px 0",
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => { }}
                    />
                )}
            </div>
        </div>
    );
};








function CheckoutPage(props) {

    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const [newAddress, setNewAddress] = useState(false)
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [checkedAddress, setCheckedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false)
    const [paymentOptions, setPaymentOptions] = useState(false)
    const [confirmOrder, setConfirmOrder] = useState(false);
    const dispatch = useDispatch();

    const onAddressSubmit = (addr) => {
        setCheckedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    }

    function selectAddress(addr) {
        const updateAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, selected: true } : { ...adr, selected: false }
        );
        setAddress(updateAddress);
    }

    function confirmDeliveryAddress(addr) {
        setConfirmAddress(true);
        setCheckedAddress(addr);
        setOrderSummary(true);
    }
    function enableAddressEditForm(addr) {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress)
    }
    function userOrderConfirmation(){
        setOrderSummary(false);
        setOrderConfirmation(true);
        setPaymentOptions(true);
    }
    function onConfirmOrder(){
        const totalAmount = Object.keys(cart.cartItems).reduce(
            (totalPrice, key) => {
              const { price, qty } = cart.cartItems[key];
              return totalPrice + price * qty;
            },
            0
          );
          const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            payablePrice: cart.cartItems[key].price,
            purchasedQty: cart.cartItems[key].qty,
          }));
          const payload = {
            addressId: checkedAddress._id,
            UserName : checkedAddress.name,
            mobileNumber : checkedAddress.mobileNumber,
            pinCode : checkedAddress.pinCode,
            address : checkedAddress.address,
            cityDistrictTown : checkedAddress.cityDistrictTown,
            state : checkedAddress.state,
            landmark : checkedAddress.landmark,
            alternatePhone : checkedAddress.alternatePhone,
            addressType : checkedAddress.addressType,
            totalAmount,
            items,
            paymentStatus: "pending",
            paymentType: "cod"
          };
      
          dispatch(addOrder(payload));
          setConfirmOrder(true);
    } 

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    useEffect(() => {
        const address = user.address.map(adr => ({
            ...adr,
            selected: false,
            edit: false
        }));
        setAddress(address);

         user.address.length === 0 && setNewAddress(true);
         user.address.length > 0 && setNewAddress(false);

    }, [user.address]);

    if(confirmOrder){
        dispatch(getOrders());
        props.history.push('/account/orders');
    }

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: 'flex-start' }} >
                <div className="checkoutContainer" >
                    <CheckoutStep
                        stepNumber={'1'}
                        title={'LOGIN'}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId" >
                                    <span style={{ fontWeight: 500 }} >{`${auth.user.firstName} ${auth.user.lastName}`}</span>
                                    <span style={{ margin: '0 5px' }} >{auth.user.email}</span>
                                </div>) : (
                                <div>
                                    <MaterialInput
                                        label="Email"
                                    />
                                </div>)
                        }
                    />

                    <CheckoutStep
                        stepNumber={'2'}
                        title={'DELIVERY ADDRESS'}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {confirmAddress ? (
                                    <div className="loggedInId" >{`${checkedAddress.address} - ${checkedAddress.pinCode}`}</div>
                                ) : (
                                    address.map((adr, index)=> (
                                        <div key={index} >
                                        <Address
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={enableAddressEditForm}
                                            confirmDeliveryAddress={confirmDeliveryAddress}
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                        </div>
                                    )
                                    )
                                )
                                }
                            </>
                        }
                    />
                    {confirmAddress ? null : newAddress ? (
                        <>
                            <AddressForm
                            onSubmitForm={onAddressSubmit}
                            onCancel={() => setNewAddress(false)}
                        />
                        </>
                        ) : (<CheckoutStep
                            stepNumber={'+'}
                            title={'ADD NEW ADDRESS'}
                            active={false}
                            onClick={() => setNewAddress(true)} 
                        />)}
                    <CheckoutStep
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={orderSummary}
                        body={
                            orderSummary ? (
                            <CartPage onlyCartItems={true} />
                            ) : orderConfirmation ? (
                                <div className="loggedInId" >
                                  {Object.keys(cart.cartItems).length} products
                                </div>
                            ) : null
                        }
                    />
                    {
                        orderSummary ? <Card> 
                          <div className="flexRow sb" 
                             style={{
                                 padding : "20px",
                                 alignItems : "center"
                             }}
                          >
                              <p>Oredr confirm email will be send to <strong>{auth.user.email}</strong></p>
                              <MaterialButton
                                title="CONTINUE"
                                onClick={userOrderConfirmation}
                                style={{
                                    width : "200px"
                                }}
                               />
                          </div>
                        </Card> : null
                    }
                    <CheckoutStep
                        stepNumber={'4'}
                        title={'PAYMENT OPTIONS'}
                        active={paymentOptions}
                        body={
                            paymentOptions && (
                            <>
                                <div className="flexRow"
                                 style={{
                                     alignItems : "center",
                                     padding : "15px",
                                     borderTop : "1px solid gray"
                                 }}
                                 >
                                    <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="cod"
                                    style={{
                                        width : "20px",
                                        height : "20px",
                                        marginRight : "20px"
                                    }}
                                     />
                                    <div className="optionTitle" >
                                    UPI
                                    <img src={paytm} alt="paytm" />
                                    <img src={phonePay} alt="PhonePay" />
                                    <img src={gpay} alt="Google pay" />
                                    <img src={bhim} alt="Bhim" />
                                    </div>
                                </div>
                                <div className="flexRow"
                                 style={{
                                     alignItems : "center",
                                     padding : "15px",
                                     borderTop : "1px solid #ececec"
                                 }}
                                 >
                                    <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="cod"
                                    style={{
                                        width : "20px",
                                        height : "20px",
                                        marginRight : "20px"
                                    }}
                                     />
                                    <div>Credit / Debit / ATM Card</div>
                                </div>
                                <div className="flexRow"
                                 style={{
                                     alignItems : "center",
                                     padding : "15px",
                                     borderTop : "1px solid #ececec"
                                 }}
                                 >
                                    <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="cod"
                                    style={{
                                        width : "20px",
                                        height : "20px",
                                        marginRight : "20px"
                                    }}
                                     />
                                    <div>Net Banking</div>
                                </div>
                            <div
                              
                            >
                                <div className="flexRow"
                                 style={{
                                     alignItems : "center",
                                     padding : "15px",
                                     borderTop : "1px solid #ececec"
                                 }}
                                 >
                                    <input 
                                    type="radio" 
                                    name="paymentOption" 
                                    value="cod"
                                    style={{
                                        width : "20px",
                                        height : "20px",
                                        marginRight : "20px"
                                    }}
                                     />
                                    <div>Cash on delivery</div>
                                </div>
                                <MaterialButton 
                                    title="CONFIRM ORDER"
                                    onClick={onConfirmOrder}
                                    style={{
                                        width : "200px",
                                        padding : "10px",
                                        paddingLeft : "20px"
                                    }}
                                />
                            </div>
                            </>
                            )
                        }
                    />
                </div>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                    margin="10px"
                />
            </div>
        </Layout>
    )
}

export default CheckoutPage;
