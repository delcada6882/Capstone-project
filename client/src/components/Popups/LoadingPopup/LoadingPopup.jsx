import React from 'react';
import PopupBase from '../PopupBase/PopupBase';
// import Loadgo from '../../../../public/Loading.svg';
import Loadgo from '../../../../public/ReactSVG.svg';
import './LoadingPopup.scss';

function LoadingPopup(props) {
    const generatedId = props.popupId ?? `Popup:${Math.round(Math.random() * 100000) + 100000}`;
    return (
        <PopupBase hasOverlay={true} popupId={generatedId}>
            <img src={Loadgo} alt="Loading..." />
        </PopupBase>
    );
}

export let selfRef = undefined;
export let instantiate = <LoadingPopup ref={(ref) => {selfRef = ref}} />;

export default LoadingPopup;
