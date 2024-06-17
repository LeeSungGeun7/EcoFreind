import axios from "axios";
import { EF_DOMAIN, getSessionId } from './utils';


export const userApi = {
// 회원조회
getCustomerInfo : async() => {
    // const session = localStorage.getItem('session_id')
    // if (!session) return
    // const parse =  JSON.parse(session);
    // if (!parse.session_id) return
    const id = getSessionId()
    return await axios.post(EF_DOMAIN + `/userdata`,
    {session_id : id }
    );
},
isRightPassword: async(password) => {
    // const session = localStorage.getItem('session_id')
    // if (!session) return
    // const parse =  JSON.parse(session);
    // if (!parse.session_id) return
    const id = getSessionId()
    return await axios.post(EF_DOMAIN + `/user/password`,
    {session_id : id
    , 
    password : password
    }
    );
},

}