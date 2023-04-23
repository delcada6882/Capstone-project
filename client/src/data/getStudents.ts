import Axios from 'axios';
import { UUID } from 'crypto';
import { Student } from './Interfaces/Student';

export async function getAllStudents() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllStudents',
    })
        .then((res) => {
            return res.data as Student[];
        })
        .catch(console.error);
}

export async function getSomeStudents(page?: number, limit?: number) {
    page = page ?? 0;
    limit = limit ?? 30;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeStudents/${page}/${limit}`,
    })
        .then((res) => {
            return res.data as Student[];
        })
        .catch(console.error);
}

export async function validateStudent(
    loginEmail: string,
    loginPassword: string,
    showErrorMessages: boolean = false
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
            return res;
        })
        .catch((error) => {
            if (showErrorMessages) console.error(error);
        });
}

export async function addStudent(studentJSON: Student) {
    return await Axios({
        method: 'POST',
        data: studentJSON,
        withCredentials: true,
        url: '/api/addStudent',
    })
        .then((res) => {
            return res;
        })
        .catch(console.error);
}

export async function getStudentsByClass(class_id: UUID) {
    class_id = class_id ?? 0;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getStudentsByClass/${class_id}`,
    })
        .then((res) => {
            return res.data as Student[];
        })
        .catch(console.error);
}
