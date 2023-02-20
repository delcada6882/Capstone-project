import React from 'react';
import PopupBase from '../PopupBase/PopupBase';
import Loadgo from '../../../../public/Loading.svg';
import './LoadingPopup.scss';

function LoadingPopup(props) {
    return (
        <PopupBase>
            <img src={Loadgo} alt="Loading..." />
        </PopupBase>
    );
}

export default LoadingPopup;
