import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { getAllCategory } from '../../actions';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCaretRight } from "react-icons/ai";
import { generatePublicUrl } from '../../urlConfig';
import { Link } from 'react-router-dom';

function MenuHeaderForHome(props) {

   const category = useSelector( state => state.category );
   const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory())
    }, [])

    function renderCategories(categories) {

        let myCategories = []; 
        for (let category of categories) { 
            myCategories.push(
                <li key={category.name} >
                    {
                         category.parentId 
                         ? category.children.length > 0  
                         ? <a>{category.name}<span className="mainicon" style={{top : "2px"}} ><AiOutlineCaretRight /></span></a> 
                         :<a><Link to={`/${category.slug}?cid=${category._id}&type=${category.type}`} >{category.name}</Link></a> 
                         : category.children.length > 0 
                         ? <span style={{textAlign : "center"}} ><img style={{width : "50px", height :"50px", marginTop : "20px"}} src={ category.img.data != undefined ? `data:image/${category.img.contentType};base64,${category.img.data.toString('base64')}` : null} /><br/>{category.name}<span className="mainicon" ><IoIosArrowDown /></span></span> 
                         : <span><Link to={`/${category.slug}?cid=${category._id}&type=${category.type}`} style={{textDecoration : "none", color : "black"}} ><img style={{width : "50px", height :"50px", marginTop : "20px"}} src={ category.img.data != undefined ? `data:image/${category.img.contentType};base64,${category.img.data.toString('base64')}` : null}/><br/>{category.name}</Link></span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }


    return (
        <div className='menuHeader' style={{height : "120px", paddingBottom : "15px"}} >
           <ul>
                { category.categories.length > 0 ? renderCategories(category.categories) : null }
           </ul>
             
        </div>
    )
}

export default MenuHeaderForHome
