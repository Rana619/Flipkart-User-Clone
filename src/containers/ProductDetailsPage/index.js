import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions';
import Layout from '../../components/Layout';
import { 
  IoIosArrowForward, 
  IoIosStar, 
  IoMdCart 
} from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/MaterialUI';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import { addToCart } from '../../actions';
import  Price  from "../../components/UI/Price"
import assured from "../../images/logo/assured.jfif";
import cupon from "../../images/logo/cupon.png"


/**
* @author
* @function ProductDetailsPage
**/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);
  const [showPhoto, setShowPhoto] = useState(null);

  useEffect(() => {
    const { productId } = props.match.params;
    const payload = {
      params: {
        productId
      }
    }
    dispatch(getProductDetailsById(payload));
  }, []);

  if(Object.keys(product.productDetails).length === 0){
    return null;
  }


  return (
    <Layout>
    <div className="mainProductDetailsCont">
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
          {
              product.productDetails.productPictures.map((thumb, index) => 
              <div 
              key={index} 
              className="thumbnail" 
              onClick={() => {setShowPhoto(thumb.img)}} 
              >
                <img src={ thumb.img.data != undefined ? `data:image/${thumb.img.contentType};base64,${thumb.img.data.toString('base64')}` : null} alt={thumb.img.contentType} />
              </div>
              )
            }
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={ product.productDetails.productPictures.length > 0 && showPhoto ? `data:image/${showPhoto.contentType};base64,${showPhoto.data.toString('base64')}` : product.productDetails.productPictures.length > 0 && `data:image/${product.productDetails.productPictures[0].img.contentType};base64,${product.productDetails.productPictures[0].img.data.toString('base64')}` } alt={`${  product.productDetails.productPictures.length > 0 && product.productDetails.productPictures[0].img.contentType}`} />
            </div>
            <div className="flexRow" 
             style = {{
               justifyContent: "space-between"
             }}
            >
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px',
                }}
                size="48%"
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({_id, name, price, img}));
                  props.history.push('/cart');
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px',
                }}
                size="48%"
                icon={<AiFillThunderbolt />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({_id, name, price, img}));
                  props.history.push('/checkout');
                }}
              />
            </div>
          </div>
        </div>
        <div>

          <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="#">Samsung</a><IoIosArrowForward /></li>
              <li><a href="#">{product.productDetails.name}</a></li>
            </ul>
          </div>
          {/* product description */}
            <div className="productDetails">
              <p className="productTitle">{product.productDetails.name}</p>
            <div>
            <p style={{ color : "green", fontWeight : "500", marginTop : "-10px" }} >Special price</p>
             <Price fontSize= {"30px"}  value ={product.productDetails.price} />
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews <img src={assured} style={{height :"20px", position : "relative", top : "5px"}} /> </span>
            </div>
          
          
            <div>
              <p style={{ 
                color: '#212121', 
                fontSize: '15px',
                fontWeight: '600' 
                }}>Available Offers</p>

               <div className="cuponCont" >
               <img src={cupon} style={{ height : "20px" }} />
               <span style={{fontWeight : "500", marginLeft :"10px", marginRight : "5px" }} >
               Special Price 
               </span> 
               Get extra 10% off (price inclusive of discount) 
               <a href="#" style={{marginLeft : "5px", textDecoration : "none"}} >T&C</a> 
               </div>

               <div className="cuponCont" >
               <img src={cupon} style={{ height : "20px" }} />
               <span style={{fontWeight : "500", marginLeft :"10px", marginRight : "5px" }} >
               Bank Offer 
               </span> 
               10% off on SBI Credit Card, up to ₹1500. On orders of ₹5000 and above 
               <a  href="#" style={{marginLeft : "5px", textDecoration : "none"}} >T&C</a>
               </div>

               <div className="cuponCont" >
               <img src={cupon} style={{ height : "20px" }} />
               <span style={{fontWeight : "500", marginLeft :"10px", marginRight : "5px" }} >
               Bank Offer 
               </span> 
               Flat ₹1500 off on SBI Credit Card. On order of ₹30,000 and above 
               <a  href="#" style={{marginLeft : "5px", textDecoration : "none"}} >T&C</a>
               </div>

               <div className="cuponCont" >
               <img src={cupon} style={{ height : "20px" }} />
               <span style={{fontWeight : "500", marginLeft :"10px", marginRight : "5px" }} >
               Bank Offer
               </span> 
               5% Unlimited Cashback on Flipkart Axis Bank Credit Card 
               <a  href="#" style={{marginLeft : "5px", textDecoration : "none"}} >T&C</a>
               </div>

              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '14px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
              }}>Description</span>
              <span style={{
                fontSize: '13px',
                color: '#212121',
              }}>{product.productDetails.description}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )

}

export default ProductDetailsPage