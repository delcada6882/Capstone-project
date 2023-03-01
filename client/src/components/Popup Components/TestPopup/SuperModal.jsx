import React from 'react';
import './SuperModal.scss';
import reactLogo from '../../../../public/ReactSVG.svg';

export let SuperModalRoot;
export let ModalController;
export async function buildModal() {
    SuperModalRoot = (
        <SuperModal ref={(FuncRef) => (ModalController = FuncRef)}></SuperModal>
    );
}

class SuperModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overlay: false,
            components: [
                {
                    component: (props) => {
                        return (
                            <img
                                {...props}
                                width={'30%'}
                                style={{ cursor: 'pointer', ...props.style }}
                                src={reactLogo}
                            ></img>
                        );
                    },
                    Id: crypto.randomUUID(),
                    props: {},
                    attributes: {
                        visabliity: true,
                        overlay: true,
                    },
                },
            ],
        };
    }

    Display = (comp, attr) => {
        const newId = crypto.randomUUID();
        const newComponent = {
            component: comp,
            Id: newId,
            attributes: { visabliity: true, overlay: false },
        };
        this.setState((prevState) => {
            return {
                components: [...prevState.components, newComponent],
            };
        });
        return newId;
    };
    Show = (Id) => {
        this.GetModalIndexById(Id);
    };
    GetModalIndexById = (Id) => {
        const result = this.state.components.filter((elem, idx) => {
            if (elem.Id === elem.Id) return idx;
        })[0];
        console.log(result);
        if (!result) {
            if (Id === undefined)
                console.error(
                    'SuperModal:\n    No Id was given, Make sure to pass a component Id in as a paramter when using the ModalController'
                );
            else
                console.error(
                    'SuperModal:\n    Was not able to find an open component with that id'
                );
        }
        return result;
    };

    render() {
        return (
            <h1 id={'SuperModal'}>
                {this.state.components.map((Obj, idx) => {
                    if (!Obj.attributes.visabliity) return null;
                    const Elem = Obj.component;
                    return (
                        <Elem
                            {...Obj.props}
                            className={`ModalChild ${Obj.props.className ?? ''} ${Obj.attributes.overlay ? 'overlay' : ''}`}
                            style={{ zIndex: '1' }}
                            key={Obj.Id}
                        ></Elem>
                    );
                })}
                {this.props.children}
            </h1>
        );
    }
}

export default SuperModal;
