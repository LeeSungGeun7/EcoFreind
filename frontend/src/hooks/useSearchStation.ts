import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { chargerApi } from "../api/charger";
import { useGeoLocation } from "./useGeoLocation";
import useIntersectionObserver from "./useIntersectionObserver";


interface Props {
    isMore : Boolean;
    skip : number; 
    type : Data ;
    loc : Loc;
}

interface Data {
    station_name : string ;
    city : string ;
    charger_method : string ;
    charger_type : string ;

}
interface Loc {
    latitude : number ; 
    longitude : number ;
    meter : number ; 
}


const useSearch = ({isMore , loc , type}:Props) => {

const { searchValue } = useParams();
const [loading , setLoading] = useState(false);
const [chargeData,setChargeData] = useState<any>([])
const [skip , setSkip] = useState(0)

const fetchData = async () => {
  setLoading(true)
  const res = await chargerApi.searchData("",searchValue ? searchValue : "","","",0)
  if (res.status === 200) {
    setChargeData(res.data)
  }
  setLoading(false)
}


// 데이터 페칭 
const handleSearch = useCallback( async (isMore = false ) => {
  console.log(JSON.stringify(loc))
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
      setChargeData((prevChargeData:any) => [...prevChargeData, ...res.data]);
    }
  } else {
    if (res.status === 200) {
      setChargeData(res.data);
    }
  }
},[type.station_name, type.city, type.charger_method, type.charger_type, skip, loc.meter]
);



return {
    chargeData,
    loading , 
    fetchData , 
    handleSearch
}

}