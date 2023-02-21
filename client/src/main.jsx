import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PopupControl } from './components/Popups/PopupRoot/PopupRoot';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {PopupControl.run}
        <App />
    </React.StrictMode>
);
