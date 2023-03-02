import { useEffect } from 'react';
import { SuperModalController } from '../components/Popup Components/TestPopup/SuperModal';
import Login from './Login';

function View2() {
    useEffect(() => {
        const login = SuperModalController.Display(Login);
    }, []);

    return (
        <div>
            <h1>I'm view 2... :&#40; </h1>
        </div>
    );
}

export default View2;
