import React from 'react';
import {
    IoGift,
    IoBagSharp
} from "react-icons/io5";
import {
    MdStars
} from "react-icons/md";

import {
    AiFillQuestionCircle
} from "react-icons/ai";

function Footer(props) {
    return (
        <div style={{ background: "#172337", color : "white", fontSize : "12px", marginTop : "310px" }} >
            <div style={{ display: "flex", paddingTop : "30px", paddingLeft : "20px", paddingRight : "20px", paddingBottom : "40px" }} >
                <div style={{ display: "flex",width : "60%", justifyContent : "space-around"  }} >
                    <div style={{width : "18%", lineHeight : "25px"}} >
                        <span style={{opacity : "0.5"}} >ABOUT</span><br />
                        <span>Contact Us</span><br />
                        <span>About Us</span><br />
                        <span>Careers</span><br />
                        <span>Flipkart Stories</span><br />
                        <span>Press</span><br />
                        <span>Flipkart Wholesale</span><br />
                        <span>Corporate Information</span>
                    </div>
                    <div style={{width : "18%", lineHeight : "25px"}} >
                        <span style={{opacity : "0.5"}} >HELP</span><br />
                        <span>Payments</span><br />
                        <span>Shipping</span><br />
                        <span>Cancellation & Returns</span><br />
                        <span>FAQ</span><br />
                        <span>Report Infringement</span><br />
                    </div>
                    <div style={{width : "18%", lineHeight : "25px"}} >
                        <span style={{opacity : "0.5"}} >POLICY</span><br />
                        <span>Return Policy</span><br />
                        <span>Terms Of Use</span><br />
                        <span>Security</span><br />
                        <span>Privacy</span><br />
                        <span>Sitemap</span><br />
                        <span>EPR Com</span><br />
                    </div>
                    <div style={{width : "18%", lineHeight : "25px"}} >
                        <span style={{opacity : "0.5"}} >SOCIAL</span><br />
                        <span>Facebook</span><br />
                        <span>Twitter</span><br />
                        <span>YouTube</span><br />
                    </div>
                </div>
    
            <div style={{ display : 'flex', width : "40%", justifyContent : 'space-around', borderLeft : "1px solid white" }} >
                <div style={{width : "30%"}} >
                    <span style={{marginBottom : "10px", opacity : "0.5"}} >Mail Us:</span>
                    <div style={{marginTop : "10px"}} >
                        Flipkart Internet Private Limited,
                        Buildings Alyssa, Begonia &
                        Clove Embassy Tech Village,
                        Outer Ring Road, Devarabeesanahalli Village,
                        Bengaluru, 560103,
                        Karnataka, India
                    </div>
                </div>


                <div style={{width : "30%"}} >
                    <span style={{marginBottom : "10px", opacity : "0.5"}} >Registered Office Address:</span>
                    <div style={{marginTop : "10px"}} >
                        Flipkart Internet Private Limited,
                        Buildings Alyssa, Begonia &
                        Clove Embassy Tech Village,
                        Outer Ring Road, Devarabeesanahalli Village,
                        Bengaluru, 560103,
                        Karnataka, India
                        CIN : U51109KA2012PTC066107
                        Telephone: 1800 202 9898
                    </div>
                </div>
            </div>
            </div>

            <div style={{ display: "flex", fontSize : "14px", borderTop : "1px solid white" , padding : "25px"}}>
              <div style={{display : "flex" , width : "70%", justifyContent : "space-around"}} >
                <div><span style={{position : "relative", top : "2px", color : "gold", fontSize : "18px", marginRight : "5px"}} ><IoBagSharp /></span>Sell On Flipkart</div>
                <div><span style={{position : "relative", top : "2px", color : "gold", fontSize : "18px", marginRight : "5px"}} ><MdStars /></span>Advertise</div>
                <div><span style={{position : "relative", top : "2px", color : "gold", fontSize : "18px", marginRight : "5px"}} ><IoGift/></span>Gift Cards</div>
                <div><span style={{position : "relative", top : "2px", color : "gold", fontSize : "18px", marginRight : "5px"}} ><AiFillQuestionCircle /></span>Help Center</div>
                <div>© 2007-2021 Flipkart.com</div>
              </div>
            </div>
        </div>
    )
}

export default Footer
