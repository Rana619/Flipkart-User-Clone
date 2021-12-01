import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHomePage } from '../../actions';
import Layout from '../../components/Layout'
import { generatePublicUrl } from '../../urlConfig';



function AllProductsWithOffer(props) {

    const homePage = useSelector(state => state.homePage);
    const dispatch = useDispatch();
    const [allOfferWithProducts, setAllOfferWithProducts] = useState([]);
    const { match } = props
    const offerTitel = match.params.productWithOffer
    let Header = "";

    if(offerTitel === 'dealsOfThe'){
        Header = 'Deals Of The Day'
    }else if(offerTitel === 'dealsOnTvsAndAppliances'){
        Header = 'Deals On Tvs And Appliances'
    }else if(offerTitel === 'fashionBudgetBuys'){
        Header = 'Fashion Budget Buys'
    }else if(offerTitel === 'furnitureBestSellers'){
        Header = 'Furniture Best Sellers'
    }else if(offerTitel === 'topOffersOn'){
        Header = 'Top Offers On'
    }else if(offerTitel === 'bestPriceOnFashion'){
        Header = 'Best Price On Fashion'
    }else if(offerTitel === 'topDealsOnElectronics'){
        Header = 'Top Deals On Electronics'
    }else if(offerTitel === 'easeYourDailyChores'){
        Header = 'Ease Your Daily Chores'
    }else if(offerTitel === 'homeMakeover'){
        Header = 'Home Makeover'
    } else if(offerTitel === 'newLaunches'){
        Header = 'New Launches'
    }
    
 

    useEffect(() => {
        if (match.params != undefined && homePage.homePage.length > 0) {
            setAllOfferWithProducts(homePage.homePage[0][offerTitel])
        }
    }, [homePage.loading])

    useEffect(() => {
        dispatch(getHomePage());
    }, []);

    return (
        <Layout>
        <div style={{background : "white", marginTop : "10px"}} >
          <div style={{padding : "40px", borderBottom : "1px solid #cecece"}} >
               <div 
                 style={{
                     textAlign : "center", 
                     fontSize : "22px", 
                     fontWeight : "500",
                     }} >
                   {Header}
                </div>
               <div 
                 style={{
                     textAlign : "center",
                     opacity : "0.7"
                     }} >
                    {allOfferWithProducts.length>0 && allOfferWithProducts.length} Items
                </div>
          </div>
          <div style={{display : "flex", flexWrap : "wrap"}} >
           {
             allOfferWithProducts.length>0 && allOfferWithProducts.map((item, index) => (
             <div key={index} className="productCont" style={{width : "25%", marginTop : "50px"}} >
                <div className="productImgCont" >
                    <Link to={item.navigateTo} >
                        <img key={index} style={{ maxHeight: "150px", maxWidth: "200px", padding: "0px", margin: "0px" }} src={ item.productId.productPictures[0].img.data != undefined ? `data:image/${item.productId.productPictures[0].img.contentType};base64,${item.productId.productPictures[0].img.data.toString('base64')}` : null} />
                    </Link>
                </div>
                <div>
                    <div className="offerHeader" >{item.header}</div>
                    <div className="offerText" >{item.offer}</div>
                    <div className="offerSub" >{item.subHeader}</div>
                </div>
             </div>
            ))
           }
          </div>
        </div>
        </Layout>
    )
}

export default AllProductsWithOffer
