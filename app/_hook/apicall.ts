import axios from "axios";

export const getItem = async () =>  {
    const res = await axios.get('/api/memo');
    return await res.data;
}
