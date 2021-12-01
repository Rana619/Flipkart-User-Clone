import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions';
import getParams from '../../../utils/getParams';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Carousel from 'react-material-ui-carousel';
import { Link } from "react-router-dom";
import { generatePublicUrl } from '../../../urlConfig';



function ProductPage(props) {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;
    useEffect(() => {
       const params = getParams(props.location.search);
       const payload = {
            params
       }       
       dispatch(getProductPage(payload));
    }, []);

    return (
        <div style={{margin : '0 10px'}} >
          <h3>{page.title}</h3>

          <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
          >
             {
               page.banners && page.banners.map((banner, index) =>
                 <a 
                   key={index} 
                   style={{ display : 'block'}}
                   href = {banner.navigateTo} 
                  >
                    <img style={{width : "100%", height : "430px"}} src={ banner.img.data != undefined ? `data:image/${banner.img.contentType};base64,${banner.img.data.toString('base64')}` : null} alt="banner" />
                 </a>
               )
             }
          </Carousel>

          <div
            style={{
              width : "100%",
              display : "flex",
              flexWrap : "wrap",
              justifyContent : "center"
              }}
          >
            {
              page.products && page.products.map((product, index) =>
                  <Link 
                    style ={{
                      width : "450px",
                      height : "250px",
                      background : "white",
                      display : "flex",
                      justifyContent : "center",
                      alignItems : "center",
                      margin : "15px"
                    }}
                    to={product.navigateTo} 
                    key={index}
                  >
                     <img style={{height : '200px'}} src={ product.img.data != undefined ? `data:image/${product.img.contentType};base64,${product.img.data.toString('base64')}` : null} alt="" />
                  </Link>
              )
            }
          </div>
        </div>
    )
}

export default ProductPage
