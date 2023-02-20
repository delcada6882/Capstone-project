import React, { useEffect, useRef } from 'react';
import Popup from './popup/Popup';

function AddPopup(props) {
    let opened  = props.opened ? props.opened : 'false';
	let popupId = props.popupId ? props.popupId : `popup-${Math.floor(Math.random() * 10000)}`;
    return (
    <Popup popupId={popupId} opened={opened} onClick={props.onClick ?? undefined}>
        {props.children}
    </Popup>
	);
}

export default AddPopup;
