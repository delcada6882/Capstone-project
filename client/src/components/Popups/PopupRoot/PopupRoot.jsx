import React, { cloneElement, Component, createRef, useEffect, useMemo, useRef, useState } from 'react';
import PopupBase from '../PopupBase/PopupBase';
import './PopupRoot.scss';

function PopupRoot(props, ref) {
    const [toBeRendered, setToBeRendered] = useState([]);
    let me = createRef();
    
    useMemo(() => {
        setToBeRendered(currentPopups);
    }, [currentPopups]);

    console.log('rendered');

    return (
        <div className={`PopupRoot ${props.className}`} ref={me}>
        {toBeRendered.map((currentArray, i) => {
            let Comp = currentArray.component;
            let props = currentArray.props;
            return <Comp
            key={i}
            {...props}
            />
        })}
        </div>
    );
}

export class Classtroller extends Component{
    constructor(props) {
        super(props);
        this.state = {
            current: []
        }
    }

    render() {
        return (
            <div className={`PopupRoot ${this.props.className}`}>
                {currentPopups.map((currentArray, i) => {
                    let Comp = currentArray.component;
                    let props = currentArray.props;
                    return <Comp
                    key={i}
                    {...props}
                    />
                })}
            </div>
        );
    }
}

export let externalRef = undefined;
export let currentPopups = [];
export let PopupControl = {
    add: (comp, props) => {
        if(currentPopups.every(elem => elem.component != comp)){
            currentPopups.push({component: comp, props: props});
            externalRef.forceUpdate();
        }
    },
    remove: (comp) => {
        let temp = currentPopups.length;
        currentPopups.filter(elem => {elem.component != comp});
        externalRef.forceUpdate();
        return temp !== currentPopups.length;
    },
    removeMostRecent: () => {
        let temp = currentPopups.at(-1);
        currentPopups.pop();
        externalRef.forceUpdate();
        return temp;
    },
    // find: (id) => {
    //     if(!id) return;
    //     let popupFoundByID = -1;
    //     for(let iter of currentPopups){
    //         if(iter.id === id)
    //             popupFoundByID = iter;
    //     }
    //     if (popupFoundByID === -1) {
    //         console.log(
    //             `%c@PopupRoot: %cRequested popup element(%c"${id}"%c) was not found in the current popups`,
    //             'color:aqua;font-family:system-ui;font-weight:bold',
    //             '',
    //             'color:#FF7100',
    //             ''
    //         );
    //     }
    //     return popupFoundByID.comp;
    // },
    // run: <PopupRoot forwardRef={(ref)=> {console.log(ref); externalRef = ref}}/>
    run: <Classtroller ref={(ref) => {externalRef = ref}}/>
};

export default PopupRoot;
