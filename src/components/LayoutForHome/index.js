import React from 'react'
import Header from '../Header'
import MenuHeaderForHome from '../MenuHeaderForHome'


function LayoutForHome(props) {
    return (
      <>
        <Header />
        <div style={{ backgroundColor : "#F1F3F6"}}>
        <MenuHeaderForHome />
        {props.children}
        </div>
      </>
    )
}

export default LayoutForHome
