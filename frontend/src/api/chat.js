import axios from 'axios';
import { useAxios } from '../hooks/useAxios';
import { EF_DOMAIN } from './utils';

axios.defaults.withCredentials = true

export const chatApi =  {

getMessages :  async (ct_id) => {
    const response = await axios.get(EF_DOMAIN + "/get/message", {
        params: {
            ct_id: ct_id,
          }
    });
    return response;
},


}


