import axios from 'axios';

export const infocontrolApiMobile = axios.create({
  baseURL: 'https://www.infocontrol.com.ar/prueba/api/mobile',
});
