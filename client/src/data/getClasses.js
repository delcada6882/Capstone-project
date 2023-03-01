import Axios from 'axios';

export function getAllClasses() {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllClasses',
    }).then((res) => {
        // console.log(res.data);
    });
};