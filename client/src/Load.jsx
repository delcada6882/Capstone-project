import React, { useEffect, useRef } from 'react';
import Loadgo from '../public/loadingBlocks.svg'
import Popup from './components/popup/Popup';
import test, {Test} from './components/test'
import AddPopup from './components/AddPopup';

function Load() {
    setTimeout(() => {
        test.open();
    }, 0);
    // setTimeout(() => {
    //     test.close(<Popup>Hello</Popup>)
    // }, 200);
    

    return (
	<div className="Load">
        <AddPopup>Hello</AddPopup>
        <img src={Loadgo} alt="Loading..."/>
    </div>
	);
}

export default Load;
