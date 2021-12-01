import React from 'react';
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams';
import ClothingAndAccessories from './ClothingAndAccessories';
import MobileLaptopPage from './Mobile-LaptopPage';
import ProductPage from './ProductPage';
import ProductStore from './ProductStore';
import './style.css'

function ProductListPage(props) {
  function renderProduct(){
    const params = getParams(props.location.search);
    let content = null;
    switch(params.type){
        case 'store' :
          content =  <ProductStore {...props} />;
        break;
        case 'page' :
          content = <ProductPage {...props} />
        break;
        case 'product' :
          content = <MobileLaptopPage {...props} withoutLayout="true" />
        break;
        default :
          content = <ClothingAndAccessories {...props} />;
    }
    return content;
  }

    return (
        <Layout>
           <div className="mainCont" >
              {renderProduct()}
           </div>
        </Layout>
    )
}

export default ProductListPage
