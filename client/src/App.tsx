import React, { useState } from 'react';
import RouterPath from './RouterPath';
import { BrowserRouter } from 'react-router-dom';
import SuperModal, {
    buildModal,
} from './components/Modal Components/SuperModal/SuperModal';
import './App.scss';
export let backupRef = undefined;

function App() {
    const [superModalStatus, setSuperModalStatus] = useState(false);
    const handleBuild = (newRef) => {
        backupRef = newRef;
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
