import React, {
    Component,
    createRef,
    useEffect,
    useRef,
    useState,
} from 'react';
import Popup from './popup/Popup';

export class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popups: [],
        };
    }

    open = (component) => {
        let tempState = { component: component };
        this.setState({ popups: [...this.state.popups, component] });
    };
    close = (component) => {
        console.log(this.state);
        let newState = this.state.popups.filter((elem) => {elem.props.popupId == component.props.popupId});
        this.setState({ popups: newState });
        console.log(newState);
    };

    render() {
        if (this.state.popups.length < 1) return null;
        let components = [];
        let i = 0;
        for (let iter of this.state.popups) {
            console.log(iter);
            if (iter.props.opened) {
                components.push(iter);
            }
            i++;
        }
        return components;
    }
}

let me;
let test = {
    open: (component, other) => {
        console.log(component);
        console.log(other);
        console.log(component.props);
        me.open(component);
    },
    close: (component) => {
        me.close(component);
    },
    instance: (
        <Test
            ref={(ref) => {
                me = ref;
            }}
        />
    ),
};

export default test;
