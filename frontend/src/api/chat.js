import axios from 'axios';
import { EF_DOMAIN } from './utils';



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