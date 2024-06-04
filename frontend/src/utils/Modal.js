import React from 'react';
import styled from 'styled-components';

 const Modalst = styled.div`
.modal-overlay {
    display: flex;
    flex-direction: column;
    position : fixed;
    justify-content: space-evenly;
    top : 50%;
    left : 50%; 
    background-color: whitesmoke;
    color : black;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 50%;
    border: 3px solid gray;
    opacity: 95%;
    padding-left: 2%;
    padding-right: 2%;
    border-radius: 20px 20px;
    
}
.title {
  position: none;
  top : 50%;
  left: 50%;
  justify-content: center;
  margin-bottom : 20px;
  font-size: 30px;
  font-style: normal;
}
.modal-content {
    position: relative;
    display: flex;
    /* border: solid 1px; */
    left: 1000x;
    bottom: 50px;
    justify-content: center;
    font-size: 20px;
    font-style: normal;

}
.modal-content h2 {
    font-size: 40px;
}
.div1 {
    text-align: center;
    font-size: 20px;
}
.div2 {
    font-size: 15px;
}
div {
  display: flex;
  justify-content: center;
  margin-top: 40px; 
}`;

const Modal = ({ isOpen, onClose , contents, title1 }) => {
  if (!isOpen) {
    return null;
  }
  return ( 
    <Modalst>
    <div className="modal-overlay">
      <div className='title'>{title1}</div>
      <div className="modal-content">
        <p>&nbsp;&nbsp;&nbsp;{contents}</p>
      </div>
      <div className='bottom'>
      <button onClick={onClose}>Close</button>
      </div>
    </div>
    </Modalst>
  );
};

export default Modal;

