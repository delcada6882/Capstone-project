import Axios from 'axios';

export async function getAllStudents() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllStudents',
    })
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch(console.error);
}

export async function getSomeStudents(page, limit) {
    page = page ?? 0;
    limit = limit ?? 30;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeStudents/${page}/${limit}`,
    })
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch(console.error);
}

export async function validateStudent(
    loginEmail,
    loginPassword,
    showErrorMessages
) {
    return await Axios({
        method: 'POST',
        data: {
            email: loginEmail,
            password: loginPassword,
        },
        withCredentials: true,
        url: '/api/login',
    })
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            if (showErrorMessages ?? false) console.error(error);
        });
}

export async function addStudent(studentJSON) {
    return await Axios({
        method: 'POST',
        data: {
            student_id: studentJSON?.student_id,
            first_name: studentJSON.first_name,
            last_name: studentJSON.last_name,
            password: studentJSON?.password,
            email: studentJSON.email,
            verified: studentJSON?.verified,
            contact: studentJSON?.contact,
            created: studentJSON?.created,
        },
        withCredentials: true,
        url: '/api/addStudent',
    })
        .then((res) => {
            return res;
        })
        .catch(console.error);
}

export async function getStudentsByClass(class_id) {
    class_id = class_id ?? 0;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getStudentsByClass/${class_id}`,
    })
        .then((res) => {
            // console.log(res.data);
            return res.data;
        })
        .catch(console.error);
}
