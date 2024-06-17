import React ,{useState , useEffect }from "react";
import Header from "../layout/Header";
import styled , {css} from "styled-components";
import KaKao from "../Components/KakaoMap";

import { useNavigate, useParams } from "react-router-dom";
import {  TbMoodCry , TbMoodHappy } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import Filter from "../Components/Filter";
import { TbMoodSearch } from "react-icons/tb";
import {debounce} from "lodash";
import { useGeoLocation } from "../utils/useGeoLocation";
import { BiCurrentLocation } from "react-icons/bi";
import { TbMessageChatbot } from "react-icons/tb";
import { chargerApi } from "../api/charger";

const center = `
display: flex ;
justify-content: center;
align-items : center;
`



const Container = styled.div`
  display: flex ;
  justify-content: center;
  flex-direction: column;
  align-items : center;
  padding : ${props => props.padding};
  height: ${props => props.h};
  width: ${props => props.w};
  background-color: white ;
  position : relative;

  .filter {
    width: 40px;
    font-size: 1.5rem;
    color: black;
  }
  .geo-button {
    position: absolute;
    bottom: 0 ;
    right: 0;
    z-index : 20;
    font-size: 2rem;
  }
  button {
    border : none ;
    border-radius: 15px;
    background-color: white;
  }
`


const ListContainer = styled.div`
  justify-content: center;
  height: 100%;
  width: 90%;
  background-color: silver;
  overflow-y: scroll;
`

const Item = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items : center;
  height : 80px;
  margin-bottom: 0.5px;
  width : 100%; 
  background-color: white;

  border: #56F5F3 1px;

  .title {
    flex-direction:column;
    display: flex;
    justify-content:center;
    align-items : center;
  }
 
/* 사용자 fav 목록 가져와서 set으로 초기화한다음에 
이후에 fav버튼누를때 fav에 해당아이템이 있으면 
서버에 제거요청 보내고 set에서 해당아이템제거
있으면 추가요청 보내고 set 에 해당아이템 추가하기  */
`

const SelectBox = styled.div`
  width: 90%; 
  height : 50px;
  ${center}
  justify-content: space-evenly;
  background-color: skyblue ;
  color:white;

  input {
    width: 30%;
    border: none;
    border-radius : 30px;
    padding: 10px;
  }
`

const SelectMenu = styled.ul`
padding: 5px;
  position : relative;
  &:hover .select-list {
      display:block;
  }

  .select-list {
    display:none;
    position : absolute ;
    left: 50%; /* 가로 중앙 정렬을 위해 left: 50% 설정 */
    transform: translateX(-50%); /* 요소 자체의 너비만큼 왼쪽으로 이동하여 중앙 정렬 */
    top: 100%;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 80px;
    height: auto ;
    border-radius: 15px;
  }
  
`


const SelectItem = styled.li`
    border-radius: 15px;
    height: 50px;
    color:black;
    ${center}
    ${props => props.type === props.children && css`
    color: skyblue;
  `}
`


const ChargerItem = ({ data , setSS }) => {
  const navigate = useNavigate();
  const getFav = async () => {

    const res = await chargerApi.getWishStations();
    if (!res) return
    if (res.status === 200) {
      setFav(new Set(res.data))
    }
  }

  const handleRoute = (id , name) => {
      navigate(`/service/${id}/${name}`)
  }

  useEffect(()=>{
    getFav()
  },[])


  const [fav , setFav] = useState(new Set([]))
  
  const handelFav = async (id) => {
    if (!fav.has(id)) {
      console.log(fav)
      const res = await chargerApi.addWishStation(id);

       if (res && res === true){
          setFav(new Set([...fav,id]));
          }
    } else {
       const res = await chargerApi.delwishStation(id);
       if (res && res === true) {
          const newFav = new Set(fav);
          newFav.delete(id);
          setFav(newFav);
       }
    }
  }

  return (
    <>
      {data.map((item, idx) => (
        <Item  key={idx}>
          <FaStar onClick={()=>{handelFav(item.id)}} style={{color: fav.has(item.id) ? "yellow" : "silver" }}/>
          <div onClick={()=>{setSS({lat:item.latitude , lng:item.longitude})}} className="title">
            <div>{item.station_name}</div>
            <div style={{fontSize:"11px"}}>{item.charger_type + "+" + item.charger_type_major}</div>
          </div>
          <TbMessageChatbot onClick={()=>{handleRoute(item.id, item.station_name ? item.station_name : "이름없음")}}  style={{fontSize:"20px"}} />
          {
            item.user_restriction ==="이용가능" ? 
          <TbMoodHappy style={{backgroundColor:"",color:"skyblue"}}/> :
            <TbMoodCry/>
          }
        </Item>
      ))}
    </>
  );
};








const CarSerach = () => {
const { searchValue } = useParams();



const [chargeData,setChargeData] = useState([])

const fetchData = async () => {
  const res = await chargerApi.searchData("",searchValue ? searchValue : "","","",0)
  
  console.log(res.data)
  if (res.status === 200) {
    setChargeData(res.data)
  }
}

const [skip , setSkip] = useState(50)





const moreData = async () => {
  const res = await chargerApi.searchData(
    type.station_name,
    type.city,
    type.charger_method,
    type.charger_type
    ,skip)
  if (res.status === 200) {
    setChargeData((prevChargeData) => [...prevChargeData, ...res.data]);
  }
  setSkip(skip+50)

}



  const geolocationOptions = {
    enableHighAccuracy: true,
    timeout: 1000 * 10,
    maximumAge: 1000 * 3600 * 24,
  }          
  const {location } = useGeoLocation(geolocationOptions)



useEffect(()=>{
  fetchData();  
},[])


const handleInput = debounce((e) => {
  setType({...type , city: e.target.value , station_name: e.target.value});
},200)



const handleSearch = async () => {
  console.log(type.city);
  const res = await chargerApi.searchData(
    type.station_name,
    type.city,
    type.charger_method,
    type.charger_type
    ,skip)
    if (res.status === 200) {
      setChargeData(res.data)
    }

}



 const [filterOpen,setFilterOpen]= useState(false)

 const [type,setType] = useState({
    station_name : "" ,
    charger_type : "" ,
    charger_method : "",
    city : "",
 })
    
 const [ss,setSS] = useState({
    lat : 37.394776,
    lng : 127.11116,
 })

    return (
      <>
    <Header overlap={false}/>
      
      <Container  w={'100vw'} h={'100vh'}>

        <Container w={'90%'} h={'50%'}>
         <BiCurrentLocation className="geo-button" onClick={()=>{

          if (location) {
            setSS({lat : location.latitude , lng : location.longitude})
          }
          }}>X</BiCurrentLocation>
          <KaKao chargerInfo={chargeData} Lat={ss.lat} Lng={ss.lng}/>
        </Container>

          <SelectBox>
              <input onKeyPress={(e) => {if (e.key === 'Enter') { handleSearch();}}} placeholder="지역 or 충전소명" defaultValue={type.station_name}  onChange={(e)=>{handleInput(e)}} maxLength={30} type="text" />
              <TbMoodSearch onClick={()=>{handleSearch()}} className="filter"/> 
              <SelectMenu>
                  타입
                  <div className="select-list">
                      <SelectItem onClick={()=>{setType({...type,charger_type:"급속"})}} type={type.charger_type}>급속</SelectItem>
                      <SelectItem onClick={()=>{setType({...type,charger_type:"완속"})}} type={type.charger_type}>완속</SelectItem>
                  </div>
              </SelectMenu>
              <SelectMenu>
                충전방식
                  <div className="select-list">
                      <SelectItem onClick={()=>{setType({...type,charger_method:"AC3상"})}} type={type.charger_method}>AC3상</SelectItem>
                      <SelectItem onClick={()=>{setType({...type,charger_method:"DC콤보"})}} type={type.charger_method}>DC콤보</SelectItem>
                  </div>
              </SelectMenu>
              <SelectMenu>

              </SelectMenu>
          </SelectBox>

         <ListContainer>
            
            <ChargerItem setSS={setSS} data={chargeData}/>

          </ListContainer> 
          <button onClick={()=>{moreData()}}>more</button>
        
         
      </Container>
        <Filter isOpen={filterOpen}  />        
     {/* <Footer/> */}
      </>
    );    
  };

export default CarSerach;