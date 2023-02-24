import React, { useEffect } from 'react';
import './App.scss';
import LoadingPopup from './components/Popups/LoadingPopup/LoadingPopup';
import { PopupControl } from './components/Popups/PopupRoot/PopupRoot';


function App() {
    PopupControl.add(LoadingPopup, {className:"david"});

    return <div className="App"></div>;
}

export default App;
