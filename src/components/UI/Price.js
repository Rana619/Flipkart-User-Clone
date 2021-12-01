import React from "react";
import { BiRupee } from "react-icons/bi";
import NumberFormat from 'react-number-format';

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
        display : "flex",
        justifyContent : "flex-start",
        alignItems : "center"
      }}
    >
      <NumberFormat 
          value={props.value} 
          displayType={'text'} 
          thousandSeparator={true} 
          prefix={'₹'}
      />
    </div>
  );
};

export default Price;