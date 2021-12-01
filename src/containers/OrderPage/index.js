import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { generatePublicUrl } from "../../urlConfig";

import "./style.css";
import { Breed } from "../../components/MaterialUI";


/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item, index) => (
            <div key={index}>
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order/details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={ item.productId.productPictures[0].img.data != undefined ? `data:image/${item.productId.productPictures[0].img.contentType};base64,${item.productId.productPictures[0].img.data.toString('base64')}` : null}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
            </div>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;


