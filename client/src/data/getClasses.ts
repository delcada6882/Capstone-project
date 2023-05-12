import Axios from 'axios';
import { Class } from './Interfaces/Class';

export async function getAllClasses() {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: '/api/getAllClasses',
    }).then((res) => {
        return res.data as Class[];
    });
}

export async function getClassById(class_id?: string) {
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getClassById/${class_id}`,
    }).then((res) => {
        return res.data as Class[];
    });
}
