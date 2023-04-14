import React from 'react';
import './SuperModal.scss';
import LoadingPopup from '../LoadingModal/LoadingModal';
import ToastContainer from '../Toasts/Toast';
import { backupRef } from '../../../App';

const ValidateUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
export let SuperModalRef = undefined;
export function buildModal(ref) {
    SuperModalRef = ref;
}

const DevBuild_validateModalRef = () => {
    if (SuperModalRef === undefined) {
        console.info(
            `SuperModal_DevBuild:\n\tNo Modal ref found,\n\timported backup`
        );
        SuperModalRef = backupRef;
        if (backupRef === undefined)
            console.error(
                `SuperModal_DevBuild:\n\tBackupRef was not found,\Try reloading the page if that dosn't work then\n\tPlease make sure app exports backup properly`
            );
    }
};
/*  
    this object below makes sure that the functions ALWAYS exist on the SuperModalController. 
        Before, when the SupermodalController was just the refference to the SuperModal class
        react would accastionally freak out, the ref variable would clear and not rebuild since react refreshes smarter,
        This is a bad thing for this since when editing code it wouldn't reload the whole page
        By useing this as a middle man it helps when developing so those bugs don't waste our time
        This also helps VS code know the functions prehand so it autofills for you :)
*/
export const SuperModalController = {
    Display: (component, attributes) => {
        DevBuild_validateModalRef();
        SuperModalRef.Display(component, attributes);
    },
    Remove: (ComponetId) => {
        SuperModalRef.Remove(ComponetId);
    },

    EditAttributesOf: (ComponetId, changedAttributes) => {
        DevBuild_validateModalRef();
        SuperModalRef.EditAttributesOf(ComponetId, changedAttributes);
    },

    Hide: (ComponetId) => {
        DevBuild_validateModalRef();
        SuperModalRef.Hide(ComponetId);
    },
    Show: (ComponetId) => {
        DevBuild_validateModalRef();
        SuperModalRef.Show(ComponetId);
    },

    ShowLoading: () => {
        DevBuild_validateModalRef();
        SuperModalRef.ShowLoading();
    },
    HideLoading: () => {
        DevBuild_validateModalRef();
        SuperModalRef.HideLoading();
    },

    ClearToasts: () => {
        DevBuild_validateModalRef();
        SuperModalRef.ClearToasts();
    },
    Toast: (component, attributes) => {
        DevBuild_validateModalRef();
        SuperModalRef.Toast(component, attributes);
    },

    RESET: () => {
        DevBuild_validateModalRef();
        SuperModalRef.RESET();
    },
};

let DisplayQueue = [];
let displays = [];
class SuperModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* DEV BUILD ITEM --> */ DevBuild_session:
                Date.now() /* <-- DEV BUILD ITEM */,
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
        this.state({ components: [], currentToasts: [] });
    };

    Display = (comp, attr) => {
        const timeStamp = Date.now();
        const InQueue = () => {
            return DisplayQueue.find(
                ({ time, stringified }) =>
                    timeStamp - time < 10 || stringified == JSON.stringify(comp)
            );
        };
        if (InQueue()) return;

        /* DEV BUILD ITEMS --> */ if (
            this.state.components.find((compo) => compo.component == comp)
        )
            if (timeStamp > this.state.DevBuild_session) return;
        /* <-- DEV BUILD ITEMS */

        DisplayQueue.push({
            stringified: JSON.stringify(comp),
            time: timeStamp,
        });

        const newId = crypto.randomUUID();
        attr = attr ?? {};

        let newComponent = {
            component: comp,
            Id: newId,
            attributes: {
                props: attr['props'] ?? {},
                visible: attr['visible'] ?? true,
                overlay: attr['overlay'] ?? true,
                /* DEV BUILD ITEM --> */ created:
                    timeStamp /* <-- DEV BUILD ITEM */,
            },
        };

        if (typeof comp != 'function')
            newComponent.component = () => {
                return comp;
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
        this.setState((prevState) => {
            return (prevState.constants.loadingModal.attributes.visible = true);
        });
    };
    HideLoading = () => {
        this.setState((prevState) => {
            return (prevState.constants.loadingModal.attributes.visible = false);
        });
    };
    Remove = (Id) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        if (IDX == 'all') this.setState({ components: [] });

        this.setState((prevState) => {
            const StateIDX = this.GetModalIndexById(Id, false);
            if (StateIDX == null) return prevState;
            return prevState.components.splice(StateIDX, 1);
        });
    };
    Show = (Id) => {
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
            return (prevState.components[IDX].attributes.visible = true);
        });
    };
    Hide = (Id) => {
        const IDX = this.GetModalIndexById(Id);
        console.log(IDX);
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
            return (prevState.components[IDX].attributes.visible = false);
        });
    };
    EditAttributesOf = (Id, changedAttributes) => {
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
            return (prevState.components[IDX].attributes = {
                ...prevState.components[IDX].attributes,
                ...changedAttributes,
            });
        });
    };

    GetModalIndexById = (Id, showErrorMessages) => {
        showErrorMessages ??= true;
        if (Id === undefined) {
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
        let evnt = new CustomEvent('clearToasts');
        for (let iter of document.getElementsByClassName('Toast')) {
            if (!Object.values(iter.classList).includes('ani-remove'))
                iter.dispatchEvent(evnt);
        }
        // this.setState({ currentToasts: [] });
    };
    Toast = (Element, Options) => {
        const timeStamp = Date.now();

        if (DisplayQueue.find((time) => timeStamp - time < 10)) return;
        DisplayQueue.push(timeStamp);

        const newId = crypto.randomUUID();

        if (Element.hasOwnProperty('Title')) {
            Element = (
                <div className="toastContainer">
                    <h3 className="toastHeading">{Element.Title}</h3>
                    <p className="toastContent">{Element.Content ?? ''}</p>
                </div>
            );
        }

        const newToast = {
            Id: newId,
            Active: true,
            Options: Options ?? {},
            component: () => {
                return Element;
            },
        };

        this.setState({
            currentToasts: [...this.state.currentToasts, newToast],
        });
    };

    render() {
        const renderToasts = () => {
            return this.state.currentToasts.map((Toast, idx) => {
                const Elem = Toast.component;

                const removeCallback = (toastRef) => {
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
                        {...Toast.Options}
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
            // console.log(this.state.components);
            // const unique = [...new Set(this.state.components.map(item => item.Component))]
            // console.log(unique);
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
