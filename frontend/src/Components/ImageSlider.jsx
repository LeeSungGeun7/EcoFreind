import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Image = styled.div`
    width:100%;
    height:100%;
  background-size: contain;  

    .container {
        display:flex;
        justify-content:center;
        align-items:center;
      //  border: 1px solid;
        
     
    }
    .container h2 {
    position: absolute;
    right: 60%;
  color: #333;
  display: block;
  font-weight: 900;
  font-size: 50px;
  overflow: hidden;
        width:20%;

 
  
}
`;

const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((previousIndex) => (previousIndex + 1) % images.length);
        }, 2000); // 2000ms = 2s, adjust this to change image every X ms

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [images]);

    return (
        <Image>
       <div className='container'> 
        <h2>{images[currentImageIndex].text}</h2>    
        <img style={{maxWidth:"100%",maxHeight:"100%"}} src={images[currentImageIndex].image} alt="Sliding presentation" />
        </div>
        </Image>
    );
};

export default ImageSlider;
