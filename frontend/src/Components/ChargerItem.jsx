import React ,{useState , useEffect }from "react";
import { useNavigate  } from "react-router-dom";
import {  TbMoodCry , TbMoodHappy } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { chargerApi } from "../api/charger";
import { Item } from "../pages/CarSearch"



const ChargerItem = ({data , setLoc }) => {
    const navigate = useNavigate();
    const [fav , setFav] = useState(new Set([]))
    
    const getFav = async () => {
      const res = await chargerApi.getWishStations();
      if (!res) return
      if (res.status === 200) {
        setFav(new Set(res.data))
      }
    }

    const handleRoute = (id , name) => {
        localStorage.setItem('storedData', JSON.stringify(data));
        localStorage.setItem('scrollItem' , id);
        navigate(`/service/${id}/${encodeURIComponent(name)}`,{ state : {data}})
    }
  
    useEffect(()=>{
      getFav()
    },[])
    
    const handelFav = async (id) => {
      try {
        if (!fav.has(id)) {
          console.log(fav);
          const res = await chargerApi.addWishStation(id);
    
          console.log(res);  // Use console.log for debugging
          if (res === true) {
            setFav(new Set([...fav, id]));
          }
        } else {
          const res = await chargerApi.delwishStation(id);
          if (res === true) {
            const newFav = new Set(fav);
            newFav.delete(id);
            setFav(newFav);
          }
        }
      } catch (error) {
          navigate('/login');
      }
    };

    
    return (
      <>
        {data.map((item, idx) => (
          <Item id={`chargeItem-${item.id}`}  key={idx}>
            <FaStar onClick={()=>{handelFav(item.id)}} style={{color: fav.has(item.id) ? "yellow" : "silver" }}/>
            <div onClick={()=>{setLoc({latitude:item.latitude , longitude:item.longitude})}} className="title">
                <div>{item.station_name}</div>
                <div style={{fontSize:"11px"}}>{item.charger_type + "+" + item.charger_type_major}</div>
            </div>
            <TbMessageChatbot onClick={()=>{handleRoute(item.id, item.station_name ? item.station_name : "이름없음")}}  style={{fontSize:"20px"}} />
            {
                item.user_restriction ==="이용가능" ? 
                <TbMoodHappy style={{backgroundColor:"",color:"skyblue"}}/> 
                :
                <TbMoodCry/>
            }
          </Item>
        ))}
      </>
    );
  };

  export default ChargerItem;