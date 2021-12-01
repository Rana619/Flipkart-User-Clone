import React from 'react'
import Header from '../Header'
import MenuHeader from '../MenuHeader'

function Layout(props) {
    return (
      <>
        <Header />
        <div style={{ backgroundColor : "#F1F3F6"}}>
        <MenuHeader />
        {props.children}
        </div>
      </>
    )
}

export default Layout
