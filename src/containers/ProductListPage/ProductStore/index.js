import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProductsBySlug } from '../../../actions';
import { generatePublicUrl } from '../../../urlConfig';
import { IoIosStar, IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import './style.css'
import Price from '../../../components/UI/Price';

function ProductStore(props) {

    const product = useSelector(state => state.product)
    const priceRange = product.priceRange;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, [])

    return (
        <div style={{ marginTop : "30px" }} >
             {
                Object.keys(product.productsByPrice).map((key, index) => {
                    return (
                        <div key={index} >
                        <Card 
                          headerLeft={`${props.match.params.slug && props.match.params.slug.substr(0, props.match.params.slug.indexOf("-"))} mobile under ${priceRange[key]}`}
                          headerRight={<Link
                            className="viewAllCont"
                            to={  `/allProducts/${props.match.params.slug}`}
                          >VIEW All</Link>}
                          style={{
                              width : 'calc(100% - 20px)',
                              margin : '10px'
                          }}
                        >
                            <div className="allProductsContainer" >
                                {
                                    product.productsByPrice[key].map((product, index) =>
                                      <div className="storeProductContPS" key={index} >
                                        <Link 
                                         className="productContainer" 
                                         to={`/${product.slug}/${product._id}/p`}
                                         style={{
                                             display : 'block',
                                             textDecoration : 'none',
                                             color : 'black'
                                         }}      
                                        >
                                            <div className="productImgContainer" >
                                                <img src={ product.productPictures[0].img.data != undefined ? `data:image/${product.productPictures[0].img.contentType};base64,${product.productPictures[0].img.data.toString('base64')}` : null} alt="productPic" />
                                            </div>
                                            <div className="productInfo" >
                                                <div>{product.name}</div>
                                                <div className="contandbuyCont" >
                                                    <span className="rateing" >4.3<IoIosStar /></span>
                                                    <span className='noBuy' >(3353)</span>
                                                </div>
                                                <div className="productPrice" >
                                                   <Price value={product.price} />
                                                </div>
                                            </div>
                                        </Link>
                                        <IoIosHeart 
                                           onClick={() => {
                                              const { _id, name, price } = product;
                                              const img = product.productPictures[0].img;
                                              dispatch(addToCart({_id, name, price, img}));
                                            }}
                                            className="heartIconPS"
                                        />
                                      </div>
                                    )
                                }
                            </div>
                        </Card>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default ProductStore
