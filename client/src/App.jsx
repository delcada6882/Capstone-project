import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import test, { Test } from './components/test';
import Load from './Load';

function App() {
    const [isLoadingControllers, setIsLoadingControllers] = useState(true)
    useEffect(() => {
        if(test.instance)
            setIsLoadingControllers(false)
    },[test.instance])

    return (
        <div className="App" >
            <Test/>
            {/* {isLoadingControllers || <Load/>} */}
            <Load/>
            {test.instance}
        </div>
    );
}

export default App;
