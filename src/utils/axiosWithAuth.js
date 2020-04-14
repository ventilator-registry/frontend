import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://ventilator-registry.herokuapp.com/',
        headers: {
            Authorization: token
        }
    });
};