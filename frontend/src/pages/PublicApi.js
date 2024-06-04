import React, { useEffect, useState } from 'react';
import AxiosApi from '../api/AxiosApi';


const PublicApi = () => {
  const [chargerInfo, setChargerInfo] = useState("");

  // const onChangeAddr = (e) => {
  //   const currentAddr = e.target.value;
  //   setAddr(currentAddr);
  // }

  // const onClickAddr = async() => {
  //   const response = await AxiosApi.chargerData(addr);
  //   console.log(response.data);
  // }

  useEffect(() => {
    const chargerInfo = async() => {
      const rsp = await AxiosApi.chargerData("서울특별시"); 
      if(rsp.status === 200) setChargerInfo(rsp.data);
  };
  chargerInfo();
  });

  return (
    <>
      <div>
      {chargerInfo && chargerInfo.map(point => (
                    <ul>
                      <li>{point.addr}</li>
                      <li>{point.chargeTp}</li>
                      <li>{point.cpId}</li>
                      <li>{point.cpNm}</li>
                      <li>{point.cpStat}</li>
                      <li>{point.cpTp}</li>
                      <li>{point.csId}</li>
                      <li>{point.csNm}</li>
                      <li>{point.lat}</li>
                      <li>{point.lng}</li>
                      <li>{point.statUpdateDatetime}</li>
                    </ul>
                ))}
      </div>
    </>
  );
};

export default PublicApi;