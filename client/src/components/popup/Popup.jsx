import React,{Component, useEffect, createRef} from 'react';
import TailoredDiv from '../tailoredDiv/tailoredDiv';
import test from '../test';
import './popup.css';


export default class Popup extends Component{
    constructor(props) {
        super(props);
    }

	ref = createRef(); 

    handleClick = () => {
        console.log(this.props);
    }

	render() {
		return (
			<div ref={this.ref} onClick={this.props.onClick ?? this.handleClick} className="popup" id={this.props.popupId} opened={this.props.opened || 'false'}>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
// export default Popup;