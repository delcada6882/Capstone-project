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

export async function getSomeClasses(page?: number, limit?: number) {
    page = page ?? 0;
    limit = limit ?? 30;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeClasses/${page}/${limit}`,
    }).then((res) => {
        return res.data as Class[];
    });
}
