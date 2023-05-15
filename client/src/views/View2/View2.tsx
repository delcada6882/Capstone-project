import { SuperModalController } from '../../components/Modal Components/SuperModal/SuperModal';
import { validateStudent, addStudent } from '../../data/getStudents';
import {
    AnimationName,
    AnimationProperties,
} from 'HTML_components/Tooltip/TooltipTypes';
import Div from 'HTML_components/Div/Div';

function View2() {
    const handleClick = () => SuperModalController.ClearToasts();
    const createToast = () => {
        SuperModalController.Toast('This is a toast!', {
            onMount: () =>
                console.log('you can add functions for when it loads'),
            onUnmount: () => console.log(`and when it goes away`),
            onClick: () =>
                SuperModalController.Toast(
                    <Div
                        className="you Can even Pass props"
                        style={{ flexDirection: 'column', display: 'flex' }}
                    >
                        This toast is a component.
                        <button style={{ backgroundColor: 'lightGray' }}>
                            You can put all kinds of stuff in here
                        </button>
                    </Div>
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

    const aniname: AnimationName = 'shift-toward';
    const dur = 1000;
    const ani: AnimationProperties = {
        name: aniname,
        duration: dur,
        easingFunction: undefined,
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Div
                tooltipProperties={{
                    content: 'This is a tooltip',
                    showAnimation: ani,
                }}
            >
                <h1 onClick={createToast}>I'm view 2... :&#40; </h1>
                <Div onClick={handleClick}>Clear all toasts</Div>
            </Div>
        </div>
    );
}

export default View2;
