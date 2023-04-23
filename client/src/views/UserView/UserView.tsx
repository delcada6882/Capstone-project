import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Divider from 'HTML_components/Divider/Divider';

function UserView() {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState(null);

    return <Divider>HAHAH</Divider>;
}

export default UserView;
