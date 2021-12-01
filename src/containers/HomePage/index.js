import React, { useEffect } from 'react'; 
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { getHomePage } from '../../actions';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@material-ui/core'
import { generatePublicUrl } from '../../urlConfig';
import "./style.css"
import SlidingBar from '../../components/UI/SlidingBar';
import weeding from "../../images/logo/weeding.jpg";
import { Link } from 'react-router-dom';

import LayoutForHome from '../../components/LayoutForHome';


function HomePage(props) {

    const homePage = useSelector( state => state.homePage );
    const dispatch = useDispatch();
 
    function onClickViewAll(){
        dispatch(getHomePage())
    }

     useEffect(() => {
         dispatch(getHomePage())
     }, []);



    return (
       <LayoutForHome>
        <div style={{padding : "7px", paddingTop : "25px"}} >
          <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            cycleNavigation={true}
            navButtonsProps={{
                style : {
                    background : "white",
                    color : "black",
                    margin : "0px",
                    borderRadius : "0px",
                    fontSize : "25px",
                    padding : "40px 10px",
                }
            }}
            navButtonsWrapperProps={{   
               style: {
                  bottom: '30px',
                  top: 'unset'
                }
            }} 
          >
             {
                homePage.homePage.length > 0 && homePage.homePage[0].banners.map((banner, index) => (
                    <div key={index} >
                    <Link to={banner.navigateTo}  >
                       <img  className="imgClass" src={ banner.img.data != undefined ? `data:image/${banner.img.contentType};base64,${banner.img.data.toString('base64')}` : null} />
                    </Link>
                    </div>
                ))
             }
          </Carousel>
 
          <div style={{ marginTop : "15px", display : 'flex', justifyContent : "space-between" }} >
                <div style={{width : "calc(100% - 240px)"}} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].dealsOfThe.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].dealsOfThe}
                        headerLeft={"Deals Of The Day"}
                        headerRight={
                          <Link 
                            onClick={onClickViewAll}
                            className="viewAllCont"
                            to={`/allProductsWithOffer/dealsOfThe`}
                           >VIEW All
                          </Link>
                        }
                    />
                  }
                </div>
                <div >
                    <img style={{width : "230px", height : "340px"}} src={weeding} />
                </div>
                  
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].dealsOnTvsAndAppliances.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].dealsOnTvsAndAppliances}
                        headerLeft={"Deals On Tvs And Appliances"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/dealsOnTvsAndAppliances`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].fashionBudgetBuys.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].fashionBudgetBuys}
                        headerLeft={"Fashion Budget Buys"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/fashionBudgetBuys`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].furnitureBestSellers.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].furnitureBestSellers}
                        headerLeft={"Furniture Best Sellers"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/furnitureBestSellers`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].topOffersOn.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].topOffersOn}
                        headerLeft={"Top Offers On"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/topOffersOn`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].bestPriceOnFashion.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].bestPriceOnFashion}
                        headerLeft={"Best Price On Fashion"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/bestPriceOnFashion`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].topDealsOnElectronics.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].topDealsOnElectronics}
                        headerLeft={"Top Deals On Electronics"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/topDealsOnElectronics`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].easeYourDailyChores.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].easeYourDailyChores}
                        headerLeft={"Ease Your Daily Chores"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/easeYourDailyChores`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].homeMakeover.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].homeMakeover}
                        headerLeft={"Home Makeover"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/homeMakeover`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

          <div style={{ marginTop : "15px" }} >
                  {
                    homePage.homePage.length > 0 
                    && homePage.homePage[0].newLaunches.length > 0 &&
                    <SlidingBar 
                        items={homePage.homePage[0].newLaunches}
                        headerLeft={"New Launches"}
                        headerRight={
                            <Link 
                            className="viewAllCont"
                            to={`/allProductsWithOffer/newLaunches`}
                            >VIEW All
                            </Link>
                        }
                    />
                  }
          </div>

        </div>
        </LayoutForHome>
    )
}

export default HomePage
