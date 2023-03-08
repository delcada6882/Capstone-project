import { SuperModalController } from '../components/Modal Components/SuperModal/SuperModal';

function View2() {
    const handleClick = () => SuperModalController.ClearToasts();
    const createToast = () => {
        SuperModalController.Toast(
            {
                Title: 'This is a toast',
                Content: `this is the description of the toast, it can be left blank`,
            },
            {
                onMount: () =>   console.log('you can add functions for when it loads'),
                onUnmount: () => console.log(`and when it goes away`),
                onClick: () =>
                    SuperModalController.Toast(
                        <div
                            className="you Can even Pass props"
                            style={{ flexDirection: 'column', display: 'flex' }}
                        >
                            This toast is a component.
                            <button style={{ backgroundColor: 'lightGray' }}>
                                You can put all kinds of stuff in here
                            </button>
                        </div>
                    ),
                duration: 4000,
            }
        );
    };

    return (
        <div>
            <h1 onClick={createToast}>I'm view 2... :&#40; </h1>
            <div onClick={handleClick}>Clear all toasts</div>
        </div>
    );
}

export default View2;
