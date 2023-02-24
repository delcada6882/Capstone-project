import Axios from 'axios';

export function getAllStudents() {
    Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllStudents',
    }).then((res) => {
        console.log(res.data);
    });
};

export function getSomeStudents(page, limit) {
    page = page ?? 0;
    limit = limit ?? 30;
    Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeStudents/${page}/${limit}`,
    }).then((res) => {
        console.log(res.data);
        return res.data;
    });
};