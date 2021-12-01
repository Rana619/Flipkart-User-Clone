import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { Link } from "react-router-dom";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import LayoutWithFilter from "../../../components/LayoutWithFilter";
import { 
    IoIosStar, 
    IoIosHeart,
    IoIosArrowForward
  } from 'react-icons/io';
import Price from "../../../components/UI/Price"
import assured from "../../../images/logo/assured.jfif";
import Layout from "../../../components/Layout";



function MobileLaptopPage(props){
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {withoutLayout} = props;

  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug));
  }, []);


  return (
     withoutLayout ? <LayoutWithFilter>
     <Card
       style={{
         boxSizing: "border-box",
         padding: "10px", 
       }}
       headerLeft={
         <div>
           <div 
           style={{
             fontSize : "13px",
             opacity : "0.5"
             }} 
            >
            <span style={{position : "relative", top : "-3px"}} >Home</span> 
            <IoIosArrowForward /> 
            <span style={{position : "relative", top : "-3px"}} >Category</span> 
            <IoIosArrowForward /> 
            <span style={{position : "relative", top : "-3px"}} >Sub Category</span> 
           </div>
           <div 
            style={{
              display : "flex",
              marginTop : "25px"
            }}
           >
             <div style={{fontSize : "16px", marginRight : "10px"}} >Sort By</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Popularity</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-Low to High</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-High to Low</div>
             <div style={{ borderBottom : "3px solid blue", color : "blue", fontSize : "16px", marginRight : "10px"}} >Newest First</div>
           </div>
         </div>
       }
     >
       {product.products.map((product, index) => (

         <div key={index} className="productDetailsMainCont" >
           <Link to={`/${product.slug}/${product._id}/p`} className="ProductPageCont" >
               <div className="productImgCont" >
                   <img src={ product.productPictures[0].img.data != undefined ? `data:image/${product.productPictures[0].img.contentType};base64,${product.productPictures[0].img.data.toString('base64')}` : null} />
                   <div style={{marginTop : "15px", marginLeft : "-50px" }} >
                       <input type="checkbox" />
                       <span>Add to Compare</span>
                   </div>
               </div>
               <div className="NameandDecCont" >
                 <div style={{fontSize :"20px", fontWeight : "500"}} >{product.name}</div>
                 <div style={{display : "flex", marginTop : "5px"}} ><div className="ratingContpp">4.2 <IoIosStar /></div><span style={{opacity :"0.8"}} >21,599 Ratings & 1,254 Reviews</span></div>
                 <div style={{ fontSize :"14px", marginTop : "20px" }} >{product.description}</div>
               </div>
               <div style={{padding : "20px", width : "350px"}} >
                  <div style={{display :'flex', alignItems : "center"}} ><Price fontSize={"25px"} value={product.price} /><img style={{height : "25px", marginLeft : "10px"}} src={assured} /></div>
                  <div>Free Delivery</div>
               </div>
           </Link>
           <IoIosHeart 
               onClick={() => {
                const { _id, name, price } = product;
                const img = product.productPictures[0].img;
                dispatch(addToCart({_id, name, price, img}));
                }}
                className="heartIcon"
          />
        </div>
       ))}
     </Card>
   </LayoutWithFilter> : <Layout><LayoutWithFilter>
     <Card
       style={{
         boxSizing: "border-box",
         padding: "10px",
       }}
       headerLeft={
         <div>
           <div 
           style={{
             fontSize : "13px",
             opacity : "0.5"
             }} 
            >
            <span style={{position : "relative", top : "-3px"}} >Home</span> 
            <IoIosArrowForward /> 
            <span style={{position : "relative", top : "-3px"}} >Category</span> 
            <IoIosArrowForward /> 
            <span style={{position : "relative", top : "-3px"}} >Sub Category</span> 
           </div>
           <div 
            style={{
              display : "flex",
              marginTop : "25px"
            }}
           >
             <div style={{fontSize : "16px", marginRight : "10px"}} >Sort By</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Popularity</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-Low to High</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-High to Low</div>
             <div style={{ borderBottom : "3px solid blue", color : "blue", fontSize : "16px", marginRight : "10px"}} >Newest First</div>
           </div>
         </div>
       }
     >
       {product.products.map((product, index) => (
         <div key={index} className="productDetailsMainCont" >
           <Link to={`/${product.slug}/${product._id}/p`} className="ProductPageCont" >
               <div className="productImgCont" >
                   <img src={ product.productPictures[0].img.data != undefined ? `data:image/${product.productPictures[0].img.contentType};base64,${product.productPictures[0].img.data.toString('base64')}` : null} />
                   <div style={{marginTop : "15px", marginLeft : "-50px" }} >
                       <input type="checkbox" />
                       <span>Add to Compare</span>
                   </div>
               </div>
               <div className="NameandDecCont" >
                 <div style={{fontSize :"20px", fontWeight : "500"}} >{product.name}</div>
                 <div style={{display : "flex", marginTop : "5px"}} ><div className="ratingContpp">4.2 <IoIosStar /></div><span style={{opacity :"0.8"}} >21,599 Ratings & 1,254 Reviews</span></div>
                 <div style={{ fontSize :"14px", marginTop : "20px" }} >{product.description}</div>
               </div>
               <div style={{padding : "20px", width : "350px"}} >
                  <div style={{display :'flex', alignItems : "center"}} ><Price fontSize={"25px"} value={product.price} /><img style={{height : "25px", marginLeft : "10px"}} src={assured} /></div>
                  <div>Free Delivery</div>
               </div>
           </Link>
           <IoIosHeart 
               onClick={() => {
                const { _id, name, price } = product;
                const img = product.productPictures[0].img;
                dispatch(addToCart({_id, name, price, img}));
                }}
                className="heartIcon"
          />
          </div>
       ))}
     </Card>
   </LayoutWithFilter></Layout>
  );
};

export default MobileLaptopPage;
