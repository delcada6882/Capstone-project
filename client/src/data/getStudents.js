import Axios from 'axios';

export async function getAllStudents() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllStudents',
    }).then((res) => {
        // console.log(res.data);
        return res.data;
    });
}

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
}

export async function validateStudent(loginEmail, loginPassword) {
    return await Axios({
        method: 'POST',
        data: {
            email: loginEmail,
            password: loginPassword
        },
        withCredentials: true,
        url: '/api/login',
    }).then((req,res) => {
        console.log(res, req);
        return res;
    });
}

export async function getStudentsByClass(class_id) {
    class_id = class_id ?? 0
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getStudentsByClass/${class_id}`,
    }).then((res) => {
        // console.log(res.data);
        return res.data;
    });
}
