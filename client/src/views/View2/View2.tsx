import { SuperModalController } from '../../components/Modal Components/SuperModal/SuperModal';
import { validateStudent, addStudent } from '../../data/getStudents';
import Tippy from '@tippyjs/react';

function View2() {
    const handleClick = () => SuperModalController.ClearToasts();
    const createToast = () => {
        SuperModalController.Toast('This is a toast!', {
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
        });
    };

    const checkAuth = () => {
        async function run() {
            try {
                const res = await validateStudent('donny@simp.son', 'abc');
                console.log(res);
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

    return (
        <div>
            <Tippy content={'Example'}>
                <h1 onClick={createToast}>I'm view 2... :&#40; </h1>
            </Tippy>
            <div onClick={handleClick}>Clear all toasts</div>
        </div>
    );
}

export default View2;
