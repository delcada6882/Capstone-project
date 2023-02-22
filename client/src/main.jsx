import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PopupControl } from './components/Popups/PopupRoot/PopupRoot';
import './index.scss';
import RouterPath from './RouterPath';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* {PopupControl.run} */}
        <BrowserRouter>
            <RouterPath />
        </BrowserRouter>
    </React.StrictMode>
);
