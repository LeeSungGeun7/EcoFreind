import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import markerimg from '../images/marker.png'




const Maker = styled.div`
  width: 200px;
  height: 50px;
`



function KakaoMap({loc ,chargerInfo , Lat , Lng }) {
  const mapContainer = useRef(null);
  const map = useRef(null); // map 객체를 저장할 ref를 추가
  
  useEffect(() => {
    if (mapContainer.current) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(Lat , Lng),
        level: 4,
      };
      map.current = new window.kakao.maps.Map(mapContainer.current, mapOption) // map 객체를 ref에 저장

      

      const createMarkers = () => {
        const positions = chargerInfo.map((data) => ({
          title: data.title,
          latlng: new window.kakao.maps.LatLng(data.latitude, data.longitude),
          data : data,
          map : map.current
        }));
        
        const imageSrc = "https://img.icons8.com/?size=100&id=TKAoWn72gp06&format=png&color=000000";


        positions.forEach((position, index) => {
          const imageSize = new window.kakao.maps.Size(30, 30);
          const markerImage = new window.kakao.maps.MarkerImage(markerimg, imageSize);
          const marker = new window.kakao.maps.Marker({
            map: map.current,
            position: position.latlng,
            title: position.title,
            image: markerImage,
          });


          const mark = 'https://img.icons8.com/?size=100&id=oRy0heGDK8Bg&format=png&color=000000'
          const userImg = new window.kakao.maps.MarkerImage(mark, imageSize);
          if (loc) {
            const a = {
              title: 'dd',
              latlng: new window.kakao.maps.LatLng(loc.latitude, loc.longitude),
              map: map.current
            };
            const marker = new window.kakao.maps.Marker({
              map: map.current,
              position: a.latlng,
              title: 'user',
              image: userImg,
            });
          }
        

        const overlayId = `overlay_${index}`;  
        const content =  `
        <div onclick="closeOverlay_${index}()" style="white-space:normal; flex-direction: column; padding:5px; border-radius:30px; background-color: white; width: 150px; height: 100px; display:flex; justify-content:center; align-items:center;" class="customOverlay">
          <div onclick="return false;">
            <str ong>${position.data.station_name}</str><br>
          </div>
          <div style="margin:5px; font-size:12px; height:auto; display:flex; white-space: normal; "> 
          ${position.data.address}
          </div>
          <div style="font-size:10px; color: silver">${position.data.user_restriction} </div>
        </div>
      `
        
        ;  

        
        var overlay = new window.kakao.maps.CustomOverlay({
          content: content,
          map: null,
          position: marker.getPosition()
        });

        // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
        window.kakao.maps.event.addListener(marker, 'click', function() {
          overlay.setMap(map.current);
        });

        // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
        window[`closeOverlay_${index}`] = function() {
          overlay.setMap(null);
        };

        });
        
      };
     

      if (chargerInfo.length > 0) {
        createMarkers();
      }
    }
  }, [chargerInfo, Lat, Lng]);

  useEffect(() => {
    if (map.current) {
      const moveLatLon = new window.kakao.maps.LatLng(Lat, Lng);
      map.current.setCenter(moveLatLon);
      console.log('dd')
    }

  }, [Lat, Lng]);




 

  
  return <div id="map" ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}

export default KakaoMap;

