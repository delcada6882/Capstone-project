import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import RouterPath from './RouterPath';
import { BrowserRouter } from 'react-router-dom';
import {
    SuperModalRoot,
    buildModal,
} from './components/Popup Components/TestPopup/SuperModal';

await buildModal();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {SuperModalRoot}
        <BrowserRouter>
            <RouterPath />
        </BrowserRouter>
    </React.StrictMode>
);

// document.dispatchEvent(new Event('load'), {
//     bubbles: true,
// });
