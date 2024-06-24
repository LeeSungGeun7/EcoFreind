import axios from "axios";
import { EF_DOMAIN, getSessionId } from './utils';

axios.defaults.withCredentials = true

export const userApi = {
// 회원조회
getCustomerInfo : async() => {
    const id = getSessionId()
    return await axios.post(EF_DOMAIN + `/userdata`,
    {session_id : id }
    );
},
isRightPassword: async(password) => {
    const id = getSessionId()
    return await axios.post(EF_DOMAIN + `/user/password`,
    {session_id : id
    , 
    password : password
    }
    );
},

}