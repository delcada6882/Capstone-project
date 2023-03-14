import { SuperModalController } from '../components/Modal Components/SuperModal/SuperModal';
import { validateStudent, addStudent } from '../data/getStudents';
import Login from './Login';

function View2() {
    const handleClick = () => SuperModalController.ClearToasts();
    const createToast = () => {
        SuperModalController.Toast(
            {
                Title: 'This is a toast',
                Content: `this is the description of the toast, it can be left blank`,
            },
            {
                onMount: () =>
                    console.log('you can add functions for when it loads'),
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

    const checkAuth = () => {
        async function run() {
            try {
                const res = await validateStudent('donny@simp.son', 'abc');
            } catch (error) {
                console.error(error);
            }
        }
        run();
    };
    const checkAdd = () => {
        async function run() {
            try {
                const res = await addStudent({
                    first_name: 'gabe',
                    last_name: 'nutella',
                    email: 'nuts@bolts.valve',
                    password: 'abc',
                });
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        run();
    };
    const checkModal = () => {
        SuperModalController.Display(
            <div style={{ position: 'relative' }}>
                <Login></Login>
                <div
                    style={{
                        color: 'white',
                        position: 'absolute',
                        top: '0',
                        right: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        SuperModalController.Remove('last');
                    }}
                >
                    X
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* <h1 onClick={checkAdd}>I'm view 2... :&#40; </h1> */}
            <h1 onClick={createToast}>CREATE TOAST</h1>
            <div onClick={handleClick}>Clear all toasts</div>
            <h1 onClick={checkModal}>Create modal</h1>

            <h2
                onClick={() => {
                    SuperModalController.ShowLoading();
                    setTimeout(() => {
                        SuperModalController.HideLoading();
                    }, 5000);
                }}
            >
                Demo loading popup
            </h2>
            <h2
                onClick={() => {
                    SuperModalController.Toast(<Login></Login>);
                }}
            >
                BIG TOAST
            </h2>
        </div>
    );
}

export default View2;
