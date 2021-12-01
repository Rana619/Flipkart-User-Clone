import React from 'react';
import { CircularProgress } from '@material-ui/core';
import "./style.css";

function Spinner() {
    return (
        <div className="spinnerCont" >
            <CircularProgress />
        </div>
    )
}

export default Spinner
 