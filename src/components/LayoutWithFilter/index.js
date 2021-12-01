import React from 'react'
import assured from "../../images/logo/assured.jfif";
import flipkertSupercoine from "../../images/logo/flipkertSupercoine.jpg";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp, IoIosStar } from 'react-icons/io';
import "./style.css"


function LayoutWithFilter(props) {
    return (
        <div className="filterPageCont" >
            <div className="filerSideBarLeft" >
                <div
                    style={{
                        borderBottom: "1px solid #cecece",
                        fontSize: "19px",
                        padding: "15px",
                        fontWeight: "500"
                    }} >Filters
                </div>
                <div
                    className="CategoryLevelCont">
                    <div style={{ fontWeight: "500", marginBottom: "5px" }} >CATEGORIES</div>
                    <div className="categ" ><IoIosArrowBack /> Parent Category</div>
                    <div className="categ" ><IoIosArrowBack /> Category</div>
                    <div className="categ" ><IoIosArrowBack /> Sub Category</div>
                    <div style={{ fontSize: "14px", fontWeight: "500" }} >Super Sub Category</div>
                </div>
                <div className="PriceSelectCont" >
                    <div>PRICE</div>
                    <div className="sliderCont">
                        <input onChange={()=>{}} type="range" min="1" max="100" value="100" />
                    </div>
                    <div className="PriceLimitCont" >
                        <select>
                            <option>Min</option>
                        </select>
                        <span>to</span>
                        <select>
                            <option>25000+</option>
                        </select>
                    </div>
                </div>
                <div className="superCoineBalnce" >
                    <input style={{ marginTop: "5px" }} type="checkbox" />
                    <div className="" >
                        <div style={{ fontSize: "14px", fontWeight: "500" }} >SUPERCOINS PRICE</div>
                        <div style={{ fontSize: "13px", opacity: "0.8" }} >Balance: <img src={flipkertSupercoine} style={{ width : "13px", marginTop : "2px" }} /> 50</div>
                    </div>
                </div>
                <div className="assuredCont" >
                    <input style={{ marginTop: "5px" }} type="checkbox" />
                    <div>
                      <img 
                        src={ assured} 
                        style={{
                          height : "25px", 
                          width : "auto",
                          marginLeft : "10px",
                          marginTop : "1px"
                        }} />
                    </div>
                </div>
                <div className="BetweenSpaceCont" >
                    <div>Brand</div>
                    <IoIosArrowDown />
                </div>
                <div className="ratingCont" >
                    <div className="BetweenSpaceCont" style={{ border: "none" }} >
                        <div style={{ fontSize: "14px" }} >CUSTOMER RATING</div>
                        <IoIosArrowUp />
                    </div>
                    <div style={{ padding: "10px" }} >
                        <div className="giveMargin" >
                            <input style={{ marginTop: "5px" }} type="checkbox" /> 4 <IoIosStar /> & above
                        </div>
                        <div className="giveMargin" >
                            <input style={{ marginTop: "5px" }} type="checkbox" /> 3 <IoIosStar /> & above
                        </div>
                        <div className="giveMargin" >
                            <input style={{ marginTop: "5px" }} type="checkbox" /> 2 <IoIosStar /> & above
                        </div>
                        <div className="giveMargin" >
                            <input style={{ marginTop: "5px" }} type="checkbox" /> 1 <IoIosStar /> & above
                        </div>
                    </div>
                </div>
                <div className="assuredCont" style={{ flexDirection: "column" }} >
                    <div className="BetweenSpaceCont" style={{ border: "none" }} >
                        <div style={{ fontSize: "14px", marginLeft: "-10px" }} >OFFERS</div>
                        <IoIosArrowUp />
                    </div>
                    <div style={{ display: "flex", marginBottom: "10px" }} >
                        <input style={{ marginTop: "5px" }} type="checkbox" />
                        <div>Buy More, Save More</div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "10px" }} >
                        <input style={{ marginTop: "5px" }} type="checkbox" />
                        <div>No Cost EMI</div>
                    </div>
                    <div style={{ display: "flex", marginBottom: "10px" }} >
                        <input style={{ marginTop: "5px" }} type="checkbox" />
                        <div>Special Price</div>
                    </div>
                </div>
                <div className="BetweenSpaceCont" >
                    <div>DISCOUNT</div>
                    <IoIosArrowDown />
                </div>
                <div className="BetweenSpaceCont" >
                    <div>COLOR</div>
                    <IoIosArrowDown />
                </div>
                <div className="BetweenSpaceCont" >
                    <div>AVAILABILITY</div>
                    <IoIosArrowDown />
                </div>
            </div>
            <div className="AllProductContRight" >
                {props.children}
            </div>
        </div>
    )
}

export default LayoutWithFilter;