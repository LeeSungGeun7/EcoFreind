
import axios from 'axios';
import { EF_DOMAIN } from './utils';



export const authApi =  {
    signUP: async (request) => {
        const response = await axios.post(EF_DOMAIN + "/signup", {
            name : request.name ,
            email : request.email ,
            password : request.password, 
            gender : request.gender ,
            phone: request.phone ,
            address : request.address
        });
        return response;
    },
      // 로그인 
      memberLogin : async(id,pw) => {
        const requset = {
            email : id, 
            password : pw
        };
        return await axios.post(EF_DOMAIN + "/login" , requset);  
    },
      // 로그아웃
      logout : async() => {
        const session_id = localStorage.getItem('session_id');
        const headers = {
            headers: {
                Cookie: `session_id=${session_id};`
            },
            withCredentials: true
        };
        return await axios.post(EF_DOMAIN + `/logout`,headers);
    },


    emailcheck: async (email) => {
        const response = await axios.post(EF_DOMAIN + "/emailcheck", {
            email : email
        });
        return response;
    },


    codecheck: async (email,code) => {
        const response = await axios.get(EF_DOMAIN + "/email/codecheck", {
            params: {
                email: email,
                code: code
              }
        });
        return response;
    },

    codesend: async (email) => {
        const response = await axios.post(EF_DOMAIN + "/email", {
                to : email ,
                subject : "회원가입",
                message : ""
        });
        return response;
    },

    isExist: async (session) => {
        const response = await axios.post(EF_DOMAIN + "/session", {
            session_id : session
        });
        return response;
    },

}

