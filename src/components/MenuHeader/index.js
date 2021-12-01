import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { getAllCategory } from '../../actions';
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineCaretRight } from "react-icons/ai";
import { Link } from '@material-ui/core';

function MenuHeader(props) {

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
                         :<a href={`/${category.slug}?cid=${category._id}&type=${category.type}`} >{category.name}</a> 
                         : category.children.length > 0 
                         ? <span>{category.name}<span className="mainicon" ><IoIosArrowDown /></span></span> 
                         : <span><Link to={`/${category.slug}?cid=${category._id}&type=${category.type}`} > {category.name}</Link></span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        }
        return myCategories;
    }


    return (
        <div className='menuHeader' >
           <ul>
                { category.categories.length > 0 ? renderCategories(category.categories) : null }
           </ul>
             
        </div>
    )
}

export default MenuHeader
