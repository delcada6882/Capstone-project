import Axios from 'axios';

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

export async function getSomeClasses(page, limit) {
    page = page ?? 0;
    limit = limit ?? 30;
    return await Axios({
        method: 'GET',
        withCredentials: true,
        url: `/api/getSomeClasses/${page}/${limit}`,
    }).then((res) => {
        // console.log(res.data);
        return res.data;
    });
};

export async function getClassById(class_id) {
    if(class_id === 'exampling%20101') {
        console.log('uhh')
    }
    else {
        return await Axios({
            method: 'GET',
            withCredentials: true,
            url: `/api/getClassById/${class_id}`,
        })
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .catch(console.error);
    }
}
