import React ,{useRef,memo,useState , useEffect }from "react";
import Header from "../layout/Header";
import styled , {css} from "styled-components";
import KaKao from "../Components/KakaoMap";
import ChargerItem from "../Components/ChargerItem";
import { useLocation, useNavigate, useParams  } from "react-router-dom";
import Filter from "../Components/Filter";
import { TbMoodSearch } from "react-icons/tb";
import {debounce} from "lodash";
import { useGeoLocation } from "../hooks/useGeoLocation";
import { BiCurrentLocation } from "react-icons/bi";
import { chargerApi } from "../api/charger";
import SkeletonLoader from "../Components/SkeletonLoader";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { useCallback } from "react";

const center = `
display: flex ;
justify-content: center;
align-items : center;
`

const Container = styled.div`
  display: flex ;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1000px) {
    flex-direction: row-reverse;
  } 
  align-items : center;
  padding : ${props => props.padding};
  height: ${props => props.h};
  width: ${props => props.w};
  background-color: white ;
  position : relative;

  .kakao {
    @media (min-width: 1000px) {
      width: 100%;  
    } 
    height: 100%;
  }

  .group {
    width: 100%;
    display: flex ;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (min-width: 1000px) {
      height: 100%;  
    }
    height: 70%;

  }

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
  .btn-group {
    position: absolute;
    bottom: 5px ;
    right: 30px;
    z-index : 20;
    font-size: 2rem;
    display : flex;
    width: auto;
  }
  /* button {
    border : none ;
    border-radius: 15px;
    background-color: white;
  } */
`


const ListContainer = styled.div`
  justify-content: center;
  height: 100%;
  width: 90%;

  @media (min-width: 1000px) {
      width: 100%;  
  } 

  background-color: silver;
  overflow-y: scroll;
`

export const Item = styled.div`
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
  @media (min-width: 1000px) {
      width: 100%;  
  } 
  height : 50px;
  ${center}
  justify-content: space-evenly;
  background-color: skyblue ;
  color:white;
  z-index: 2;
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


const MeterBtn = styled.button`
      border : none ;
      border-radius: 15px;
      background-color: skyblue;
      ${props => props.val === true && css`
      background-color: black;
      color:white;
      `}   
      :hover {
        background-color: black;
        color:white;
      }
`

const NotResult = styled.div`
  display : none;
  ${props => props.val === true && css`
      ${center} 
      height: 100%;
      background-color: white ;
  `}   
`



const CarSerach = memo(() => {
const { searchValue } = useParams();
const [loading , setLoading] = useState(false);
const [chargeData,setChargeData] = useState([])

const fetchData = async () => {
  setLoading(true)
  const res = await chargerApi.searchData("",searchValue ? searchValue : "","","",0)
  if (res.status === 200) {
    setChargeData(res.data)
  }
  setLoading(false)
}

const [skip , setSkip] = useState(0)

const {location  , error : geoError } = useGeoLocation()


// 채팅페이지에서 복귀후 데이터 관리
useEffect(()=>{  
  const stored = localStorage.getItem('storedData');
  if(stored){
    setChargeData(JSON.parse(stored))
  }
  else {
  fetchData();  
  }
},[])


const handleInput = debounce((e) => {
  setType({...type , city: e.target.value , station_name: e.target.value});
},200)


 const [filterOpen,setFilterOpen]= useState(false)

 const [type,setType] = useState({
    station_name : "" ,
    charger_type : "" ,
    charger_method : "",
    city : "",
 })
    

const [loc , setLoc] = useState({
  latitude : 37.394776,
  longitude : 127.11116,
  meter : 1000
})



// 데이터 페칭 
const handleSearch = useCallback( async (isMore = false) => {
  alert(JSON.stringify(loc))
  if (!isMore) setSkip(0);
  const res = await chargerApi.searchData(
    type.station_name,
    type.city,
    type.charger_method,
    type.charger_type,
    skip,
    loc.latitude,
    loc.longitude,
    loc.meter
  );
  if (isMore) {
    if (res.status === 200) {
      setChargeData((prevChargeData) => [...prevChargeData, ...res.data]);
    }
  } else {
    if (res.status === 200) {
      setChargeData(res.data);
    }
  }
},[type.station_name, type.city, type.charger_method, type.charger_type, skip, loc]
);

const moreData = async () => {
  setSkip(prevSkip => prevSkip + 1);
  handleSearch(true);
};



// 무한 스크롤 하단감지
const target = useRef(null);

const intersectionCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
     moreData();
      }
    });
};

useIntersectionObserver(target, intersectionCallback);


const setMeter = (newMeter) => {
  setLoc((prevLoc) => ({ ...prevLoc, meter: newMeter }));
};





// 스크롤 복귀 
const listRef = useRef(null)
const scrollItem = localStorage.getItem('scrollItem')

useEffect(() => {
  if (scrollItem && listRef.current) {
    const selectedElement = document.getElementById(`chargeItem-${scrollItem}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}, [chargeData]);



    return (
      <>
    <Header overlap={false}/> 
      <Container  w={'100vw'} h={'100vh'}>


        {/* 카카오맵 */}
        <Container className="kakao" w={'90%'} h={'50%'}>
          <div className="btn-group">
            <MeterBtn val={loc.meter===500} onClick={()=>{setMeter(loc.meter === 500 ? 0 : 500) }}  className="">500m</MeterBtn>
            <MeterBtn val={loc.meter=== 1000} onClick={()=>{setMeter(loc.meter ===1000 ? 0 : 1000)}}  className="">1km</MeterBtn>
            <MeterBtn val={loc.meter===3000} onClick={()=>{setMeter(loc.meter === 3000 ? 0 : 3000)}} className="">3km</MeterBtn>
          </div>
         <BiCurrentLocation className="geo-button" onClick={()=>{
          if (location) {
            setLoc({latitude : location.latitude , longitude : location.longitude});
          }
          }}>X</BiCurrentLocation>
          <KaKao loc={loc} chargerInfo={chargeData} Lat={loc.latitude} Lng={loc.longitude}/>
        </Container>

        {/* 셀렉 박스 */}
        <div className="group">
          <SelectBox>
              <input onKeyPress={(e) => {if (e.key === 'Enter') { handleSearch();}}} placeholder="지역 or 충전소명" onChange={(e) => handleInput(e)} maxLength={30} type="text" />
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

          {/* 아이템 리스트 */}
         <ListContainer ref={listRef}  >          
            <NotResult val={!loading &&chargeData.length === 0}>
                앗 검색결과가 없어요
            </NotResult>
            {
              loading ?
              <SkeletonLoader/>
              :
            <ChargerItem setChargeData={setChargeData} setLoc={setLoc} data={chargeData}/> 
            }
            <div style={{display: loading ? 'hidden' : 'block', height:'10px'}} ref={target}></div>
            
          </ListContainer> 
        </div>
         
      </Container>
        <Filter isOpen={filterOpen}  />        

      </>
    );    
  });

export default CarSerach;