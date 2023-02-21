import React from "react";
import { PopupControl } from "../PopupRoot/PopupRoot";
import './PopupBase.scss';

/*
                Props settings
    <propName> : <data type> : <default value>
    
    hasOverlay                      : bool : true
    closeOverlayOnBackgroundClick   : bool : false
*/

function PopupBase(props) {
    return(
        <div className={`PopupBase ${props.className}`}>
            {props.children}
        </div>
    );
}

export default PopupBase;