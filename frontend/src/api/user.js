import axios from "axios";
import { Axios, EF_DOMAIN } from './utils';

axios.defaults.withCredentials = true

export const userApi = {
// 회원조회
getCustomerInfo : async() => {

    return await Axios.post(EF_DOMAIN + `/userdata`,

    );
},
isRightPassword: async(password) => {

    return await Axios.post(EF_DOMAIN + `/user/password`,
    {
    password : password
    }
    );
},

getcloudImageURL: async (form) => {
    try {
        const response = await Axios.post(`${EF_DOMAIN}/upload/image`,
        form,  // FormData 객체를 직접 전달합니다.
            {
                headers: {
                    'Content-Type': 'multipart/form-data'  // 중요: 이 헤더를 설정해야 합니다.
                }
            })
        return response.data;
    } catch (error) {
        console.error('Error getting Cloudflare upload URL:', error);
        throw error;
    }
}
}

