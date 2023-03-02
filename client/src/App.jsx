import React, { useState } from 'react';
import RouterPath from './RouterPath';
import { BrowserRouter } from 'react-router-dom';
import SuperModal, {
    buildModal,
} from './components/Popup Components/TestPopup/SuperModal';
import './App.scss';

function App() {
    const [superModalStatus, setSuperModalStatus] = useState(false);
    const handleBuild = (newRef) => {
        buildModal(newRef);
        setSuperModalStatus(true);
        return newRef;
    };

    return (
        <>
            <SuperModal
                ref={(newRef) => {
                    handleBuild(newRef);
                }}
            ></SuperModal>
            {superModalStatus ? (
                <BrowserRouter>
                    <RouterPath />
                </BrowserRouter>
            ) : null}
        </>
    );
}

export default App;
