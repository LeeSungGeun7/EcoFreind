import React, { useEffect, useRef } from 'react';
import styled, {css} from 'styled-components';
import markerimg from '/Users/sk/dev/Frontend/React_Project/ecofriends/React/src/images/marker.png'




const Maker = styled.div`
  width: 200px;
  height: 50px;
`



function KakaoMap({ chargerInfo , Lat , Lng }) {
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
        
        const imageSrc = "https://imagedelivery.net/6i45l_k8v6cNrhGva7A6BA/8663bbeb-2e5b-4c7d-442e-59d66937c000/avatar";


        positions.forEach((position, index) => {
          const imageSize = new window.kakao.maps.Size(30, 30);
          const markerImage = new window.kakao.maps.MarkerImage(markerimg, imageSize);
          const marker = new window.kakao.maps.Marker({
            map: map.current,
            position: position.latlng,
            title: position.title,
            image: markerImage,
          });

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
    }

  }, [Lat, Lng]);




 

  
  return <div id="map" ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
}

export default KakaoMap;

