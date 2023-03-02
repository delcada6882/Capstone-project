import React from 'react';
import './SuperModal.scss';
import reactLogo from '../../../../public/ReactSVG.svg';

const ValidateUUID =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
export let SuperModalController = undefined;
export function buildModal(ref) {
    SuperModalController = ref;
}
let DisplayQueue = [];
class SuperModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /* DEV BUILD ITEM --> */ session:
                Date.now() /* <-- DEV BUILD ITEM */,
            components: [
                {
                    component: (props) => {
                        return (
                            <img
                                {...props}
                                width={'30%'}
                                style={{ cursor: 'pointer', ...props.style }}
                                src={reactLogo}
                                onClick={() => {
                                    SuperModalController.Display(() => (
                                        <h2>Sup</h2>
                                    ));
                                }}
                            ></img>
                        );
                    },
                    Id: crypto.randomUUID(),
                    attributes: {
                        props: {},
                        visible: true,
                        overlay: true,
                    },
                },
            ],
        };
    }
    Display = (comp, attr) => {
        const timeStamp = Date.now();
        if (DisplayQueue.find((time) => timeStamp - time < 10)) return;

        /* DEV BUILD ITEMS --> */ if (
            this.state.components.find((compo) => compo.component == comp)
        )
            if (timeStamp > this.state.session) return;
        /* <-- DEV BUILD ITEMS */

        DisplayQueue.push(timeStamp);
        const newId = crypto.randomUUID();
        attr = attr ?? {};
        const newComponent = {
            component: comp,
            Id: newId,
            attributes: {
                props: attr['props'] ?? {},
                visible: attr['visible'] ?? true,
                overlay: attr['overlay'] ?? false,
                /* DEV BUILD ITEM --> */ created:
                    timeStamp /* <-- DEV BUILD ITEM */,
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
    Remove = (Id) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        this.setState((prevState) => {
            return prevState.components.splice(IDX, 1);
        });
    };
    Show = (Id) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        this.setState((prevState) => {
            return (prevState.components[IDX].attributes.visible = true);
        });
    };
    Hide = (Id) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        this.setState((prevState) => {
            return (prevState.components[IDX].attributes.visible = false);
        });
    };
    EditAttributesOf = (Id, changedAttributes) => {
        const IDX = this.GetModalIndexById(Id);
        if (IDX == null) return;
        this.setState((prevState) => {
            return (prevState.components[IDX].attributes = {
                ...prevState.components[IDX].attributes,
                ...changedAttributes,
            });
        });
    };

    GetModalIndexById = (Id) => {
        if (Id === undefined) {
            console.error(
                `SuperModal:
    No Id was given
    Make sure to pass a component Id in as a paramter when using the SuperModalController
    When You Dispaly a new Component the function returns its Id`
            );
            return null;
        }
        if (!ValidateUUID.test(Id)) {
            if (typeof Id == 'string')
                switch (Id.toLowerCase()) {
                    case 'last':
                        return this.state.components.length - 1;
                    case 'first':
                        return 0;
                    default:
                        console.error(
                            `SuperModal:
    Expected a UUID got a string
    You can pass in the strings ["last" and "first"]
    When You Dispaly a new Component the function returns it's Id`
                        );
                        return null;
                }
            console.error(
                `SuperModal:
    Did not recive a vaild Id
    Component Ids are UUID's and the commands ["last" and "first"]`
            );
            return null;
        }
        const result = this.state.components.filter((elem, idx) => {
            if (elem.Id === elem.Id) return idx;
        })[0];
        if (!result) {
            console.error(
                `SuperModal:
    Was unable to find an open component with that id
    mabey it was already removed?`
            );
            return null;
        }
        return result;
    };

    render() {
        return (
            <div id={'SuperModal'}>
                {this.state.components.map((Obj, idx) => {
                    if (!Obj.attributes.visible) return null;
                    const Elem = Obj.component;
                    return (
                        <Elem
                            {...Obj.attributes.props}
                            className={`ModalChild ${
                                Obj.attributes.props.className ?? ''
                            } ${Obj.attributes.overlay ? 'overlay' : ''}`}
                            style={{ zIndex: idx }}
                            key={Obj.Id}
                        ></Elem>
                    );
                })}
                {this.props.children}
            </div>
        );
    }
}

export default SuperModal;
