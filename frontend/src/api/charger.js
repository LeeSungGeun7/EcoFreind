import axios from "axios";
import { EF_DOMAIN, getSessionId } from './utils';




export const chargerApi = {

getWishStation:  async () => {
    const session_id = getSessionId()
    const response = await axios.post(EF_DOMAIN+ "/wishstation",
    {session_id : session_id}
    );
    return response;
},


getWishStations : async () => {
    const session_id = getSessionId()
    const response = await axios.post(EF_DOMAIN+ "/getfav",
    {session_id : session_id}
    );
    return response;
},



delwishStation: async (itemId) => {
  const session_id = getSessionId()
    try {
      const response = await fetch(EF_DOMAIN + "/delfav", {
        method: 'POST',
        body: JSON.stringify({ session_id: session_id ,itemId }), 
      });
      const data = await response.json();
      if (data === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('요청 중 오류가 발생했습니다:', error);
    }
  },


addWishStation: async (itemId) => {
    const session_id = getSessionId()
    try {
      const response = await fetch(EF_DOMAIN + "/addfav", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: session_id ,itemId }), // 데이터를 JSON 형식으로 전송
      });
      const data = await response.json();
  
      if (data === true) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('요청 중 오류가 발생했습니다:', error);
    }
},


 // 공공데이터 가져오기
 chargerData : async () => {
    return await axios.get(EF_DOMAIN + "/station",
    {withCredentials: true}
    )
    ;
},

   searchData : async (station_name, city , type , speed_type, skip , lat , lng , meter)  => {
    const request = {
        station_name : station_name+"" ,
        city : city+"" , 
        type : type+"" ,
        speed : speed_type+"",
        skip : parseInt(skip),
        lat : lat ,
        lng : lng ,
        meter : meter
    }
    return await axios.post(EF_DOMAIN + "/search", request);
}, 
}