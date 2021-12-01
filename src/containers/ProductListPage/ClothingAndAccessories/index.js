import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProductsBySlug } from "../../../actions";
import Card from "../../../components/UI/Card";
import { Link } from "react-router-dom";
import { 
  IoIosHeart,
  IoIosArrowForward
} from 'react-icons/io';
import { generatePublicUrl } from "../../../urlConfig";
import LayoutWithFilter from "../../../components/LayoutWithFilter";
import Price from "../../../components/UI/Price"
import assured from "../../../images/logo/assured.jfif";
import "./style.css";


function ClothingAndAccessories(props){
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  return (
    <LayoutWithFilter>
           <div 
           style={{
             fontSize : "13px",
             opacity : "0.5",
             paddingLeft : "20px",
             marginTop : "10px"
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
              marginTop : "25px",
              paddingLeft : "20px",
              borderBottom : "2px solid #cecece",
              marginBottom : "20px"
            }}
           >
             <div style={{fontSize : "16px", marginRight : "10px"}} >Sort By</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Popularity</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-Low to High</div>
             <div style={{opacity : "0.6", fontSize : "16px", marginRight : "10px"}} >Price-High to Low</div>
             <div style={{ borderBottom : "3px solid blue", color : "blue", fontSize : "16px", marginRight : "10px"}} >Newest First</div>
           </div>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
          flexWrap: "wrap"
        }} 
      >
        {product.products.map((product, index) => (
          <div className="caContainer" key={index} >
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={product.productPictures.length > 0 && product.productPictures[0].img.data != undefined ? `data:image/${product.productPictures[0].img.contentType};base64,${product.productPictures[0].img.data.toString('base64')}` : null} />
            </Link>
            <div style={{ width : "100%", paddingLeft : "20px" }} >
              <div
               style={{
                 display : "flex",
                 alignItems : "center",
               }}
              >
              <div className="caProductName">{product.name}</div>
               <img src={assured} style={{ height : "22px", marginLeft : "15px" }} />
              </div>
              <div className="caProductPrice">
                 <Price value={product.price} />
              </div>
            </div>
            <IoIosHeart 
               onClick={() => {
                const { _id, name, price } = product;
                const img = product.productPictures[0].img;
                dispatch(addToCart({_id, name, price, img}));
                }}
                className="heartIconCA"
          />
          </div>
        ))}
      </Card>
    </LayoutWithFilter>
  );
};

export default ClothingAndAccessories;