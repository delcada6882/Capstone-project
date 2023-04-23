import React from 'react';
import './SuperModal.scss';
import LoadingPopup from '../LoadingModal/LoadingModal';
import ToastContainer from '../Toasts/Toast';
import { backupRef } from '../../../App';
import { type } from 'os';
import { UUID } from 'crypto';

const ValidateUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
export let SuperModalRef: SuperModal | undefined = undefined;
export function buildModal(ref: SuperModal) {
    SuperModalRef = ref;
}

export type ModalId = UUID | 'all' | 'loadingModal';

export interface ModalAttributes {
    props?: {};
    visible: boolean;
    overlay: boolean;
    /* DEV BUILD ITEM --> */
    created?: number;
    /* <-- DEV BUILD ITEM */
}

const DevBuild_validateModalRef = () => {
    if (!SuperModalRef) {
        console.info(
            `SuperModal_DevBuild:\n\tNo Modal ref found,\n\timported backup`
        );
        SuperModalRef = backupRef;
        if (!backupRef)
            console.error(
                `SuperModal_DevBuild:\n\tBackupRef was not found,\Try reloading the page if that dosn't work then\n\tPlease make sure app exports backup properly`
            );
    }
};
export interface ToastComponent {
    Id: UUID;
    Active: boolean;
    attributes: ToastAttributes;
    component: () => JSX.Element;
}

export interface ToastAttributes {
    onMount?: () => void;
    onUnmount?: () => void;
    onClick?: () => void;
    duration?: number;
}
/*  
    this object below makes sure that the functions ALWAYS exist on the SuperModalController. 
        Before, when the SupermodalController was just the refference to the SuperModal class
        react would accastionally freak out, the ref variable would clear and not rebuild since react refreshes smarter,
        This is a bad thing for this since when editing code it wouldn't reload the whole page
        By useing this as a middle man it helps when developing so those bugs don't waste our time
        This also helps VS code know the functions prehand so it autofills for you :)
*/
export const SuperModalController = {
    Display: (
        component: (() => JSX.Element) | JSX.Element,
        attributes?: ModalAttributes
    ) => {
        DevBuild_validateModalRef();
        SuperModalRef?.Display(component, attributes);
    },

    Remove: (ComponetId: ModalId) => {
        SuperModalRef?.Remove(ComponetId);
    },

    EditAttributesOf: (
        ComponetId: ModalId,
        changedAttributes: ModalAttributes
    ) => {
        DevBuild_validateModalRef();
        SuperModalRef?.EditAttributesOf(ComponetId, changedAttributes);
    },

    Hide: (ComponetId: ModalId) => {
        DevBuild_validateModalRef();
        SuperModalRef?.Hide(ComponetId);
    },
    Show: (ComponetId: ModalId) => {
        DevBuild_validateModalRef();
        SuperModalRef?.Show(ComponetId);
    },

    ShowLoading: () => {
        DevBuild_validateModalRef();
        SuperModalRef?.ShowLoading();
    },

    HideLoading: () => {
        DevBuild_validateModalRef();
        SuperModalRef?.HideLoading();
    },

    ClearToasts: () => {
        DevBuild_validateModalRef();
        SuperModalRef?.ClearToasts();
    },
    Toast: (
        component: JSX.Element | string | (() => JSX.Element),
        attributes?: ToastAttributes
    ) => {
        DevBuild_validateModalRef();
        SuperModalRef?.Toast(component, attributes);
    },

    RESET: () => {
        DevBuild_validateModalRef();
        SuperModalRef?.RESET();
    },
};

export type DisplayItem = {
    time: number;
    stringified?: string;
};

export interface ModalComponent {
    component: React.FunctionComponent;
    Id: ModalId;
    attributes: ModalAttributes;
}

let DisplayQueue: DisplayItem[] = [];

export interface SuperModalConstants {
    loadingModal: ModalComponent;
}

export interface SuperModalState {
    DevBuild_session: number;
    components: ModalComponent[];
    constants: SuperModalConstants;
    currentToasts: ToastComponent[];
}
class SuperModal extends React.Component<{}, SuperModalState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            /* DEV BUILD ITEM --> */
            DevBuild_session: Date.now(),
            /* <-- DEV BUILD ITEM */
            components: [],
            constants: {
                loadingModal: {
                    component: LoadingPopup,
                    Id: 'loadingModal',
                    attributes: {
                        visible: false,
                        overlay: true,
                    },
                },
            },
            currentToasts: [],
        };
    }
    RESET = () => {
        // Clears all components and toasts inside the state
        // Take note that toasts will not animate out when this is called, they will just dissapear
        this.setState({ components: [], currentToasts: [] });
    };

    Display = (
        comp:  (() => JSX.Element) | JSX.Element,
        attr?: ModalAttributes
    ) => {
        const timeStamp = Date.now();
        const InQueue = () => {
            return DisplayQueue.find(
                ({ time, stringified }) =>
                    timeStamp - time < 10 || stringified == JSON.stringify(comp)
            );
        };
        if (InQueue()) return;

        /* DEV BUILD ITEMS --> */
        if (this.state.components.find((compo) => compo.component == comp))
            if (timeStamp > this.state.DevBuild_session) return;
        /* <-- DEV BUILD ITEMS */

        DisplayQueue.push({
            stringified: JSON.stringify(comp),
            time: timeStamp,
        });

        const newId = crypto.randomUUID();

        const adjustedComponent: () => JSX.Element = (typeof comp === 'function') ? comp : () => {
            return comp;
        };

        const newComponent = {
            component: adjustedComponent,
            Id: newId,
            attributes: {
                props: attr?.props ?? {},
                visible: attr?.visible ?? true,
                overlay: attr?.overlay ?? true,
                /* DEV BUILD ITEM --> */
                created: timeStamp,
                /* <-- DEV BUILD ITEM */
            },
        };



        this.setState((prevState) => {
            DisplayQueue = [];
            return {
                components: [...prevState.components, newComponent],
            };
        });
        return newId;
    };
    ShowLoading = () => {
        if (this.state.constants?.loadingModal)
            this.setState((prevState) => {
                prevState.constants.loadingModal.attributes.visible = true;
                return prevState;
            });
    };
    HideLoading = () => {
        this.setState((prevState) => {
            prevState.constants.loadingModal.attributes.visible = false;
            return prevState;
        });
    };
    Remove = (Id: ModalId) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        if (IDX == 'all') this.setState({ components: [] });

        this.setState((prevState) => {
            const StateIDX = this.GetModalIndexById(Id, false);
            if (typeof StateIDX != 'number') return prevState;
            prevState.components.splice(StateIDX, 1);
            return prevState;
        });
    };
    Show = (Id: ModalId) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        if (IDX == 'all') {
            this.setState((prevState) => {
                prevState.components.forEach((element) => {
                    element.attributes.visible = true;
                });
                return prevState;
            });
            return 'success';
        }
        this.setState((prevState) => {
            prevState.components[IDX].attributes.visible = true;
            return prevState;
        });
    };
    Hide = (Id: ModalId) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        if (IDX == 'all') {
            this.setState((prevState) => {
                prevState.components.forEach((element) => {
                    element.attributes.visible = false;
                });
                return prevState;
            });
            return 'success';
        }
        this.setState((prevState) => {
            DisplayQueue = [];
            prevState.components[IDX].attributes.visible = false;
            return prevState;
        });
    };
    EditAttributesOf = (Id: ModalId, changedAttributes: ModalAttributes) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        if (IDX == 'all') {
            this.setState((prevState) => {
                prevState.components.forEach((element) => {
                    element.attributes = {
                        ...element.attributes,
                        ...changedAttributes,
                    };
                });
                return prevState;
            });
            return 'success';
        }
        this.setState((prevState) => {
            prevState.components[IDX].attributes = {
                ...prevState.components[IDX].attributes,
                ...changedAttributes,
            };
            return prevState;
        });
    };

    GetModalIndexById = (Id?: ModalId, showErrorMessages?: boolean) => {
        showErrorMessages ??= true;
        if (!Id) {
            console.error(
                `SuperModal:
    No Id was given
    Make sure to pass a component Id in as a paramter when using the SuperModalController
    When You Dispaly a new Component the function returns its Id`
            );
            return null;
        }
        const isValidId = ValidateUUID.test(Id);
        if (!isValidId) {
            if (typeof Id == 'string')
                switch (Id.toLowerCase()) {
                    case 'all':
                        return 'all';
                    case 'last':
                        return this.state.components.length - 1;
                    case 'first':
                        return 0;
                    default:
                        if (showErrorMessages)
                            console.error(
                                `SuperModal:
    Expected a UUID got a string
    You can pass in the strings ["last", "first", and "all"]
    When You Dispaly a new Component the function returns it's Id`
                            );
                        return null;
                }
            if (showErrorMessages)
                console.error(
                    `SuperModal:
    Did not recive a vaild Id
    Component Ids are UUID's and the commands ["last", "first", and "all"]`
                );
            return null;
        }
        let result;
        this.state.components.find((elem, idx) => {
            if (elem.Id === Id) {
                result = idx;
                return true;
            }
            return false;
        });
        if (result === undefined) {
            if (showErrorMessages)
                console.error(
                    `SuperModal:
    Was unable to find an open component with that id
    mabey it was already removed?`
                );
            return null;
        }
        return result;
    };
    ClearToasts = () => {
        let event = new CustomEvent('clearToasts');
        for (let iter of document.getElementsByClassName('Toast')) {
            if (!Object.values(iter.classList).includes('ani-remove'))
                iter.dispatchEvent(event);
        }
    };
    Toast = (
        component: JSX.Element | string | (() => JSX.Element),
        attributes?: ToastAttributes
    ) => {
        const timeStamp = Date.now();

        if (DisplayQueue.find(({ time }) => timeStamp - time < 10)) return;
        DisplayQueue.push({ time: timeStamp });

        const newId = crypto.randomUUID();

        let computedComponent = component;
        if (
            typeof component === 'function' &&
            String(component).includes('return React.createElement')
        )
            computedComponent = component;
        else if (React.isValidElement(component))
            computedComponent = () => {
                return component;
            };
        else
            computedComponent = () => {
                return (
                    <div className="toastContainer">
                        <h3 className="toastHeading">
                            {typeof component == 'string' && component}
                        </h3>
                    </div>
                );
            };

        const newToast: ToastComponent = {
            Id: newId,
            Active: true,
            attributes: attributes ?? {},
            component: computedComponent,
        };

        this.setState({
            currentToasts: [...this.state.currentToasts, newToast],
        });
    };

    render() {
        const renderToasts = () => {
            return this.state.currentToasts.map((Toast, idx) => {
                const Elem = Toast.component;

                const removeCallback = (toastRef: UUID) => {
                    let IDX;
                    this.state.currentToasts.find((item, idx) => {
                        if (item.Id === toastRef) {
                            IDX = idx;
                            return true;
                        }
                        return false;
                    });
                    if (IDX == undefined) return;

                    this.state.currentToasts[IDX].Active = false;
                    const actives = this.state.currentToasts.find(
                        (item) => item.Active
                    );
                    if (actives === undefined)
                        this.setState({ currentToasts: [] });
                };
                return (
                    <ToastContainer
                        toastId={Toast.Id}
                        key={`toast-${idx}`}
                        removeCallback={(toastRef) => {
                            removeCallback(toastRef);
                        }}
                        onMount={Toast.attributes.onMount}
                        onUnmount={Toast.attributes.onUnmount}
                        onClick={Toast.attributes.onClick}
                    >
                        <Elem></Elem>
                    </ToastContainer>
                );
            });
        };
        const renderConstants = () => {
            return Object.values(this.state.constants).map((Obj) => {
                if (!Obj.attributes.visible) return null;
                const Elem = Obj.component;
                return (
                    <div
                        key={Obj.Id}
                        id={Obj.Id}
                        className={`ModalChild${
                            Obj.attributes.overlay ? ` overlay` : ''
                        }`}
                    >
                        <Elem></Elem>
                    </div>
                );
            });
        };
        const renderComponents = () => {
            const unique = this.state.components;
            return unique.map((Obj, idx) => {
                if (!Obj.attributes.visible) return null;
                const Elem = Obj.component;
                return (
                    <div
                        className={`ModalChild${
                            Obj.attributes.overlay ? ` overlay` : ''
                        }`}
                        key={`Modalchild-${idx}`}
                    >
                        <Elem {...Obj.attributes.props} key={Obj.Id}></Elem>
                    </div>
                );
            });
        };

        return (
            <div id={'SuperModal'}>
                <div id={'Toasts'}>{renderToasts()}</div>
                {renderConstants()}
                {renderComponents()}
            </div>
        );
    }
}

export default SuperModal;
