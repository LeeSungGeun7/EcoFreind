import React from "react";
import styled from "styled-components";

const Mainitems = styled.div`

.Centeritem {
    /* margin-top: 20px; */
    /* border: solid 1px; */
    width: 100%;
    height: 100vh;
    font-size: 800%;
    background-color: whitesmoke;
    position: relative;
}

b { 
    opacity: 50%;
    position: absolute;
    left: 1px;
    /* justify-content: flex-end; */
    display: flex;
    align-items: center;
    margin-left: 500px;
    margin-top: 280px;
    color: royalblue;
   font-style: oblique;
}

.Centeritem2 {
    /* border: solid 1px; */
    position: relative;
    font-style: oblique;
    left: 100px;
    top: 50px;
    /* width: 900px; */
    //height: 200px;
    font-size: 150px;
    font-weight: 500;
    color: #A1FF98;
}

.type{
    /* border: solid 1px; */
    font-size: 25px;
    font-style: oblique;
    font-family:'Do Hyeon', sans-serif;
    position: relative;
    /* left: 50px;
    top: 50px; */
    /* width: 900px; */
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    line-height: 40px;
    font-weight: bold;
    color: black;
}
.type2 {
    /* border: solid 1px; */
    display:flex:
    justify-content:space-evenly;
    font-size: 20px;
    position: relative;
   // left: 90px;
    top: 150px;

   // width: 900px;
    height: 400px;
   // line-height: 70px;
    font-style: oblique;
    font-weight: bold;
    color: #363636;
}
`;

const Mainitem = () => {
    return(
        <Mainitems>
            <div className="Centeritem" >
                   <b>EV Charger <br/>Eco Friend <br/>Korea</b>
                   <div className="Centeritem2">
                    ECO FRIEND
                   </div>
                   <div className="type">
                    전기차 충전에 불편함을 느끼셨다고요?<br/>
                    이제는 불편할 일 없이 클릭 한 번으로 끝나는 
                    충전소 위치와 충전소에 대한 상세 정보들을 <br/>
                    편리하게 제공 해드리겠습니다.
                    </div>
                    <div className="type2">
                    에코프렌즈은 2023년, 국내 최초로 전기차 충전소 위치서비스를 서울시에 런칭한 이후,
                    6만명 고객을 대상으로 차량의 공유와 전기차, 충전기에 대한 경험과 기술을 쌓아왔습니다.
                    <br/>고객만족활동과 KH 등에의 공급을 통해인정된 통합 관제 솔루션 개발 및 유지 역량, 입증된 충전기 유지, 보수 역량을 
                    바탕으로 스마트 모빌리티 분야의 다양한 서비스를 개발, 제공하고 있습니다.
                    </div>
             </div>
        </Mainitems>
    );
};

export default Mainitem;