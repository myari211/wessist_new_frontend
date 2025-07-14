import axios from 'axios';

const createConnection = (baseURLParam, isMultipart = false) => {
    const rootURL = import.meta.env.VITE_BASE_URL;
    const url = `${rootURL}${baseURLParam}`;

    const apiClient = axios.create({
        baseURL: url,
        timeout: 10000,
        headers: {
            'Content-Type' : isMultipart ? 'multipart/form-data' : 'application/json',
        }
    });

    apiClient.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('authToken');

            if(token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if(error.resposne?.status === 401) {
                console.warn('Unauthorized. Redirect to login');
            }

            return Promise.reject(error);
        }
    )

    return apiClient;
}

export const get = (params = {}, baseURL = '') => {
    const apiClient = createConnection(baseURL);
    return apiClient.get('', {params});
}

export const post = (params = {}, baseURL = '', isMultipart = false) => {
    const apiClient = createConnection(baseURL, isMultipart);
    return apiClient.post('', params);
}

export const put = (params = {}, baseURL = '', isMultipart = false) => {
    const apiClient = createConnection(baseURL, isMultipart);
    return apiClient.put('', params);
}

export const remove = (params = {}, baseURL = '') => {
    const apiClient = createConnection(baseURL);
    return apiClient.delete('', { data: params });
}