import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
    IoIosSearch
} from 'react-icons/io';
import { getProductsBySearch } from '../../actions';

function SearchComp(props) {
     const [searchInput, setSearchInput] = useState('');
     const dispatch = useDispatch(); 
     
     function onClickFun(){
       const searchText ={
          searchInput 
       }
       dispatch(getProductsBySearch(searchText));
     }

    return (
        <div className="searchInputContainer">
          <input
            className="searchInput"
            placeholder={'search for products, brands and more'}
            value={searchInput}
            onChange={(e)=> setSearchInput(e.target.value)}
          />
          <Link
            onClick={onClickFun}
            className="searchIconContainer"
            to={`/searchResult/${searchInput}`}
          >
             <IoIosSearch style={{
                 color: '#2874f0'
              }} />
          </Link>
        </div>
    )
}

export default SearchComp
