import { useState } from 'react';
import RouterPath from './RouterPath';
import { BrowserRouter } from 'react-router-dom';
import SuperModal, {
    buildModal,
} from './components/Modal Components/SuperModal/SuperModal';
import './App.scss';
export let backupRef: SuperModal | undefined = undefined;

function App() {
    const [superModalStatus, setSuperModalStatus] = useState(false);
    const handleBuild = (newRef: SuperModal | null) => {
        if (!newRef) return;
        backupRef = newRef;
        buildModal(newRef);
        setSuperModalStatus(true);
        return newRef;
    };

    return (
        <>
            <SuperModal
                ref={(newRef: SuperModal | null) => {
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
