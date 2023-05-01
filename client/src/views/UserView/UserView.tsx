import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Div from 'HTML_components/Div/Div';

function UserView() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);

    return <Div>HAHAH</Div>;
}

export default UserView;
