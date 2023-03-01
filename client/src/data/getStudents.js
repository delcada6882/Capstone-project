import Axios from 'axios';

export async function getAllStudents() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllStudents',
    }).then((res) => {
        // console.log(res.data);
        return res.data
    });
};

export async function getSomeStudents(page, limit) {
    page = page ?? 0;
    limit = limit ?? 30;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeStudents/${page}/${limit}`,
    }).then((res) => {
        // console.log(res.data);
        return res.data;
    });
};

export async function getAllClasses() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllClasses',
    }).then((res) => {
        // console.log(res.data);
        return res.data
    });
};