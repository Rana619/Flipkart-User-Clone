import React from 'react';
import Card from '../Card';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { generatePublicUrl } from '../../../urlConfig';
import './style.css'
import { Link } from 'react-router-dom';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

function SlidingBar(props) {

    const {
        headerLeft,
        headerRight,
        items
    } = props;

    return (
        <Card
            headerLeft={headerLeft}
            headerRight={headerRight}
        >
            <Carousel
              responsive={responsive}
              infinite={true}
              swipeable={false}
              draggable={false}
              keyBoardControl={true}
              showDots={false}
              autoPlaySpeed={1000}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {
                    items.map((item, index) => (
                        <div className="productCont" key={index} >
                          <div className="productImgCont" >
                            <Link to={item.navigateTo} >
                                <img style={{maxHeight : "150px", maxWidth : "200px", padding : "0px", margin : "0px"}}  src={ item.productId.productPictures[0].img.data != undefined ? `data:image/${item.productId.productPictures[0].img.contentType};base64,${item.productId.productPictures[0].img.data.toString('base64')}` : null} />
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
            </Carousel>
        </Card>
    )
}

export default SlidingBar
