import React, { useEffect, useMemo } from 'react';
import './App.css';
import LoadingPopup, {
    instantiate,
    selfRef,
} from './components/Popups/LoadingPopup/LoadingPopup';
import {
    externalRef,
    PopupControl,
} from './components/Popups/PopupRoot/PopupRoot';

// const retun = <LoadingPopup className={'david'}></LoadingPopup>;

function App() {
    // setTimeout(() => {
    //     const exampleLoadingPopupUseage = PopupControl.add(
    //         <LoadingPopup className={'david'}></LoadingPopup>
    //     );
    //     // console.log(exampleLoadingPopupUseage);
    //     // console.log(PopupControl.find(exampleLoadingPopupUseage));
    // }, 200);

    // const retun = useMemo(() => {
    //     return <LoadingPopup className={'david'}></LoadingPopup>;
    // }, [true]);
    // console.log(retun);
    // useEffect(()=> {
    //     const retun = PopupControl.add(<LoadingPopup className={'david'}></LoadingPopup>);
    // },[])
    PopupControl.add(LoadingPopup);

    // setTimeout(() => {
    //     PopupControl.removeMostRecent()
    // }, 5000);


    return <div className="App" ></div>;
}

export default App;
