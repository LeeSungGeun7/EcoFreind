import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
    
    button {
        position:relative;
        bottom: 100px;
        left: 165px;
        font-weight: bold;
        border-radius: 15px;
        color:white;
        background-color: #333333;
        border: none;
        z-index:120;
    }
    .hover:hover {
        color:#333333;
        background-color: white;
    }
    .display-block {
        position: absolute;
   // display:flex;
    justify-content:center;
    align-items:center;
    left: 35%;
    top: 50%;
    width: 30vw;
    height: 30vh;
    z-index: 100;
    border-radius: 15px;
    background-color: #DFF5EE;
        display: flex;
    }
    .display-none {
        display: none;
    }
`;

// 모달 컴포넌트
export const InquireModal = ({ handleClose, modalOpen, children }) => {
  const showHideClassName = modalOpen ? "modal display-block" : "modal display-none";

  return (
    <Modal>
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button className='hover' onClick={handleClose}>X</button>
      </section>
    </div>
    </Modal>
  );
};
