import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  withCredentials: true
})

export const sendMessage = async ({id, msg}) => {
  const res = await api.post('/publish', {
    key: id,
    value: msg
  }, {headers: {'Content-Type': 'application/json'}})
  return res.data;
}