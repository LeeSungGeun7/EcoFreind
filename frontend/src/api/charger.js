import axios from "axios";
import { EF_DOMAIN } from './utils';

export const chargerApi = {

getWishStation:  async () => {
    const session = localStorage.getItem('session_id')
    if (!session) return
    const parse =  JSON.parse(session);
    if (!parse.session_id) return
    const response = await axios.post(EF_DOMAIN+ "/wishstation",
    {session_id : parse.session_id}
    );
    return response;
},


getWishStations : async () => {
    const session = localStorage.getItem('session_id')
    if (!session) return
    const parse =  JSON.parse(session);
    if (!parse.session_id) return
    const response = await axios.post(EF_DOMAIN+ "/getfav",
    {session_id : parse.session_id}
    );
    return response;
},



delwishStation: async (itemId) => {
    const session = localStorage.getItem('session_id');
    console.log(session,"><<<<")
    if (!session) return
    const parse =  JSON.parse(session);

    if (!parse.session_id) return
    try {
      const response = await fetch(EF_DOMAIN + "/delfav", {
        method: 'POST',
        body: JSON.stringify({ session_id: parse.session_id ,itemId }), 
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
    const session = localStorage.getItem('session_id');
    console.log(session,"><<<<")
    if (!session) return
    const parse =  JSON.parse(session);

    if (!parse.session_id) return
    try {
      const response = await fetch(EF_DOMAIN + "/addfav", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id: parse.session_id ,itemId }), // 데이터를 JSON 형식으로 전송
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

   searchData : async (station_name, city , type , speed_type, skip) => {
    const request = {
        station_name : station_name+"" ,
        city : city+"" , 
        type : type+"" ,
        speed : speed_type+"",
        skip : parseInt(skip)
    }
    return await axios.post(EF_DOMAIN + "/search", request);
}, 
}