import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_NOTE_API_URL } = getEnvVariables();

const noteApi = axios.create({
    baseURL: VITE_NOTE_API_URL
});

export default noteApi;