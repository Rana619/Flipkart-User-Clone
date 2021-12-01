import React, { useEffect, useState } from 'react';
import './style.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { 
  IoIosArrowDown, 
  IoMdWallet,
  IoMdNotifications,
  IoIosTrendingUp,
} from 'react-icons/io';
import { HiDownload } from "react-icons/hi";
import { BsQuestionSquareFill, BsChatLeftTextFill } from "react-icons/bs";
import { FaToolbox } from "react-icons/fa";
import { RiCoupon3Fill, RiCopperCoinFill } from "react-icons/ri";
import { AiFillHeart, AiOutlinePoweroff } from "react-icons/ai";
import { ImFolderUpload } from "react-icons/im";
import { TiPlusOutline, } from "react-icons/ti";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom"

import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { login, signout, signup as _signup } from '../../actions';
import Cart from '../UI/cart';
import SearchComp from '../UI/SearchComp';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [worngUserorPassword, setWorngUserorPassword] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  function userSignup(){
    const user ={firstName, lastName, email, password, contactNumber};
    if(firstName === "" || lastName === "" || email === "" || password === "" || contactNumber === "" ){
      return;
    }
    dispatch(_signup(user));
  }

  function userLogin() {
    if(signup){
      userSignup()
    } else {
      dispatch(login({ email, password }))
    }
  }

  function logout(){
    dispatch(signout());
  }

  useEffect(() => {
    if(auth.authenticate){
       setLoginModal(false);
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if(auth.authenticateFail){
      setWorngUserorPassword(true);
    }
  }, [auth.authenticateFail])



  function renderLoggedInMenu() {
    return (
      <DropdownMenu
        menu={
          <a className="fullName" >
            {`${auth.user.firstName} ${auth.user.lastName}`}
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoPersonCircleSharp /></span> },
          { label: 'SuperCoin Zone', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><RiCopperCoinFill /></span> },
          { label: 'Flipkart Plus Zone', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><TiPlusOutline /></span> },
          { label: 'Orders', href: `/account/orders`, icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><ImFolderUpload /></span> },
          { label: 'Wishlist', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><AiFillHeart /></span> },
          { label: 'My Chats', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><BsChatLeftTextFill /></span> },
          { label: 'Coupons', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><RiCoupon3Fill /></span> },
          { label: 'Notifications', href: '', icon : <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoMdNotifications /></span> },
          { label: 'Gift Cards', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoMdWallet /></span> },
          { label: 'Logout', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><AiOutlinePoweroff /></span> , onClick : logout },
        ]}
      />
    );
  }

  function renderNonLoggedInMenu() {
    return (
      <DropdownMenu
        menu={
          <a 
          className="loginButton" 
          onClick={() => {
            setSignup(false);
            setLoginModal(true)
          }}
          >
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoPersonCircleSharp /></span> },
          { label: 'Flipkart Plus Zone', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><TiPlusOutline /></span> },
          { 
            label: 'Orders', 
            href: `/account/orders`, 
            icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><ImFolderUpload /></span>,
            onClick : () => {
              !auth.authenticate && setLoginModal(true);
            } 
          },
          { label: 'Wishlist', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><AiFillHeart /></span> },
          { label: 'Rewards', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><RiCoupon3Fill /></span> },
          { label: 'Gift Cards', href: '', icon: <span style={{marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoMdWallet /></span> },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a 
            onClick={() =>{
              setLoginModal(true);
              setSignup(true)
            }}
            style={{ color: '#2874f0', cursor : 'pointer' }}
            >
            Sign Up
            </a>
          </div>
        }
      /> 
    );
  }


  return (
    <div className="header">
      <Modal
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="signinForm" >
              {signup && (
                  <MaterialInput 
                    type="text"
                    label="Enter First Name"
                    value={firstName}
                    onChange={(e)=> setFirstName(e.target.value)}
                  />
                )}
              {signup && (
                  <MaterialInput 
                    type="text"
                    label="Enter Last Name"
                    value={lastName}
                    onChange={(e)=> setLastName(e.target.value)}
                  />
                )}
              {signup && (
                  <MaterialInput 
                    type="text"
                    label="Contact Number"
                    value={contactNumber}
                    onChange={(e)=> setContactNumber(e.target.value)}
                  />
                )}
                <MaterialInput
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a style={{ textDecoration: "none", fontSize: "14px", fontWeight: "500" }} href="#">Forgot?</a>}
                />
                <p
                  style={{
                    marginTop: "40px",
                    marginBottom: "20px",
                    fontSize: "12px",
                    color: "#878787",
                    marginRight: "15px",
                    marginLeft: "15px"
                  }}
                >
                  By continuing, you agree to Flipkart's
                  <a href="#" style={{ textDecoration: "none" }} >Terms of Use</a>
                  and
                  <a href="#" style={{ textDecoration: "none" }} >Privacy Policy</a>
                </p>
 
                {worngUserorPassword && <p 
                 style={{
                   color : "red"
                 }}
                >
                  Wrong User ID or Password!! please Check it
                </p>}

                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  onClick={userLogin}
                  size="90%"
                />
                {
                  !signup && 
                  <>
                  <p>OR</p>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#ffffff"
                  textColor="blue"
                  size="90%"
                />
                </>
                }
              </div>
             {
               !signup && 
               <a href="#"
                style={{
                  display: "block",
                  textDecoration: "none",
                  position: "absolute",
                  bottom: "30px",
                  fontSize: "14px",
                  fontWeight: "500"
                }}
              >
                New to Flipkart? Create an account
              </a>
             }
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">

        <Link to={"/"} className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </Link>
        <div style={{
                padding: '0 10px'
            }}>
        <SearchComp />
        </div>
        <div className="rightMenu">
          {
            auth.authenticate ?
            renderLoggedInMenu() : renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoMdNotifications /></span> },
              { label: 'Sell on flipkart', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><FaToolbox /></span> },
              { label: '24x7 Customer Care', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><BsQuestionSquareFill /></span> },
              { label: 'Advertise', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><IoIosTrendingUp /></span> },
              { label: 'Download App', href: '', icon: <span style={{ marginRight : "10px", color : "blue", fontSize : "20px", position : "relative", bottom : "-4px"}} ><HiDownload /></span> }
            ]}
          />
          <div>
            <a 
            className="cart"
            href={`/cart`}
            >
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header