import React from "react";
import './PopupBase.scss';

function PopupBase(props) {
    return(
        <div className={"PopupBase"}>
            {props.children}
        </div>
    );
}

export default PopupBase;