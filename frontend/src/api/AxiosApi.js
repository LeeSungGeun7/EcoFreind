import axios from "axios";
import { Cookies } from "react-cookie";

const KH_DOMAIN = "http://localhost:8000";
const EF_DOMAIN = "http://localhost:8000";




const AxiosApi = {

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

    isRightPassword: async(password) => {
        const session = localStorage.getItem('session_id')
        if (!session) return
        const parse =  JSON.parse(session);
        if (!parse.session_id) return
        return await axios.post(EF_DOMAIN + `/user/password`,
        {session_id : parse.session_id
        , 
        password : password
        }
        );
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

    isExist: async (session_id) => {
        const response = await axios.post(EF_DOMAIN + "/session", {
            session_id : session_id
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
    }
    ,


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


    // 세션조회
    getSession : async(value) => {
        return await axios.get(EF_DOMAIN + `/member/session?uuid=${value}`);
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

    //이메일 로그인
    googlelogin : async(response) => {
        const requset = {
            res : response
        }
        return await axios.post(EF_DOMAIN + "/api/googleLogin", requset);
    },
    // 회원조회
    getCustomerInfo : async() => {
        const session = localStorage.getItem('session_id')
        if (!session) return
        const parse =  JSON.parse(session);
        if (!parse.session_id) return
        return await axios.post(EF_DOMAIN + `/userdata`,
        {session_id : parse.session_id}
        );
    },

    // 이메일 인증키 발급
    getKeyCode : async(id) => {
        return await axios.get(EF_DOMAIN + `/api/key?email=${id}`);
    },
    // 이메일 인증
    confirmKey : async(id, key) => {
        return await axios.get(EF_DOMAIN + `/api/email/confirm?email=${id}&key=${key}`);
    },
    signUp : async(data) => {
        return await axios.post(EF_DOMAIN + "/member/signup", data);
    },
    // 비밀번호 변경
    updatePassword: async (email, newPwd) => {
        try {
          const response = await axios.post('http://localhost:3737/member/updatePassword', {
            email,
            newPwd
          });
    
          if (response.status === 200) {
            console.log("Password successfully updated.");
          } else {
            console.log("Failed to update password.");
          }
          
          return response;
        } catch (error) {
          console.error(error);
        }
      },



    // 금액충전
    insertCard : async( name, email, credit, cardNum, endDate, cvc, price) => {
        const payment = {
            payname: name,
            email: email,
            credit: credit,
            cardNum: cardNum,
            endDate: endDate,
            cvc: cvc,
            price: price
        };
        console.log(payment);
        return await axios.post(EF_DOMAIN + "/payment", payment);
    },
    // 충전금액조회
    getMoney : async(email) => {
        console.log(email)
        return await axios.get(EF_DOMAIN + `/user/${email}/charge`);
    },
    
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
      }
    ,

   
  
    inQuire : async(email,title,content) => {
        const request = {
            email : email,
            inqTitle : title,
            inqContent : content
            
        }
        return await axios.post(EF_DOMAIN + "/inquires", request);
    } ,

    
    getInQuire : async(email) => {
        try {
            const response = await axios.get(`${EF_DOMAIN}/inquires/${email}`);
            console.log(response.data);
            return response.data;
           
          } catch (error) {
            console.error('Failed to get inquires by email', error);
            return null;
          }
        },

        // 미답변 조회
        getUnAnswered : async() => {
            try {
                const response = await axios.get(EF_DOMAIN+"/inquires/unanswered");
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Failed to get inquires by email', error.message);
                return null;
            }
        },
        //답변보내기
        postAnswer : async(inqNo,answerContent) => {
            const request = {
                inqNo : inqNo,
                answerContent : answerContent,
            }

            try {
                const response = await axios.post(EF_DOMAIN+"/inquires/inquire/update",request);
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error('Failed to get inquires by email', error.message);
                return null;
            }
        }

};




export default AxiosApi;