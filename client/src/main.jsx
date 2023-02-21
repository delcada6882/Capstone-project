import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PopupRoot, {Classtroller, PopupControl} from './components/Popups/PopupRoot/PopupRoot';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {PopupControl.run}
        <App />
        {/* <Classtroller /> */}
        {/* <PopupRoot /> */}
    </React.StrictMode>
);
