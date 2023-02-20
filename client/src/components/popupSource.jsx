import React, { Component } from 'react';

const APPROXIMATE_HIDE_DELAY_MS = 400;

export class PopupController extends Component{
    activePopupSubscriptions = {};

	constructor(props) {
		super(props);
		this.state = {
			currentPopups: []
		};
	}

	open = (component, props = {}) => {
		props.opened = true;
        this.setState(({ popups }) => {
			let addNewPopup = true;
			if (props.popupId) {
				for (let popup of popups) {
					if (popup.props.popupId === props.popupId) {
						addNewPopup = false;
						popup.props = props;
					}
				}
			}
			if (addNewPopup) {
				const newPopups = [...popups, { component, props }];
				this.fireSubscriptionCallbacks(newPopups);
				return { popups: newPopups };
			}

			this.fireSubscriptionCallbacks(popups);
			return { popups };
		});
	};

	_matchComponent = (component1, component2) => {
		if (!component1 || !component2) return false;
		if (component1 === component2) return true;
		if (component1 === component2.constructor) return true;
		return false;
	};

	hide = (component) => {
		let { popups } = this.state;
		for (let i in popups) {
			if (this._matchComponent(popups[i].component, component)) {
				popups[i].props.opened = false;
			}
		}
		this.setState({ popups });
	};

	closeAll = () => {
		let { popups } = this.state;
		for (let i in popups) {
			popups[i].props.opened = false;
		}
		setTimeout(() => {
			this.setState({ popups: [] });
		}, APPROXIMATE_HIDE_DELAY_MS);
		this.setState({ popups });
		this.fireSubscriptionCallbacks([]);
	};

	closeLast = () => {
		this.setState(({ popups }) => {
			if (popups.length === 0) return { popups };
			const newPopups = popups.slice(0, popups.length - 1);

			this.fireSubscriptionCallbacks(newPopups);
			return { popups: newPopups };
		});
	};

	close = (component) => {
		let { popups } = this.state;
		let popupsToRemove = [];
        
		for (let iter of popups) {
			if (this._matchComponent(iter.component, component)) {
				iter.props.opened = false;
				popupsToRemove.push(iter);
			}
		}
		if (popupsToRemove) {
			this.setState(({ popups }) => {
				const newPopups = popups.filter((_, index) => {
					return !popupsToRemove.includes(index);
				});

				this.fireSubscriptionCallbacks(newPopups);
				return ({
					popups: newPopups
				});
			});
		}
	};

	render() {
		let comps = [];
		for (let i in this.state.popups) {
			let Comp = this.state.popups[i].component;
			let props = this.state.popups[i].props;
			comps.push(
				<Comp
					key={i}
					onHide={() => {
						this.close(Comp);
					}}
					{...props}
				/>
			);
		}
		if (comps.length > 0) return comps;
		return null;
	}

	fireSubscriptionCallbacks(popups) {
		Object.values(this.activePopupSubscriptions).forEach((callback) => {
			callback(popups);
		});
	}

	/**
	 * Add callback and subscribe to popup event
	 * @param {ActiveViewChangedCallback} callback
	 * @returns {number}
	 */
	subscribeToPopupEvent(callback) {
		const id = Date.now();
		this.activePopupSubscriptions[id] = callback;
		return id;
	}

	/**
	 * Remove subscribed callback of popup event
	 * @param id
	 */
	unsubscribeFromPopupEvent(id) {
		delete this.activePopupSubscriptions[id];
	}
}

let pc = {};
let popupController = {
	open: (Comp, props) => {
		pc.open(Comp, props);
	},
	hide: (Comp) => {
		pc.hide(Comp);
	},
	close: (Comp) => {
		pc.close(Comp);
	},
	closeLast: () => {
		pc.closeLast();
	},
	closeAll: () => {
		pc.closeAll();
	},
	instance: <PopupController ref={(ref) => (pc = ref)} />,
	subscribeToPopupEvent: (callback) => {
		return pc.subscribeToPopupEvent(callback);
	},
	unsubscribeFromPopupEvent: (id) => {
		pc.unsubscribeFromPopupEvent(id);
	}
};

export default popupController;
