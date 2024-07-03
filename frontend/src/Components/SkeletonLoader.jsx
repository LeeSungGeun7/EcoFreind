import React from 'react'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components';
import 'react-loading-skeleton/dist/skeleton.css'



const Container = styled.div`
  display:flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  /* background-color : none; */
  z-index: 3;
  background-color : ${props => props.theme.colors.black3};
`

const Rows = styled.div`
  display:flex;
  justify-content:space-evenly;
  flex-direction:column;
  margin: 30px;
  height: 80vh;
  width: 100%;

  .item-round {
    border-radius: 50px;
    width: 50px;
    height: 50px;
  }
  .row-item {
   
    flex-direction:row;
    justify-content:start;
    height: 30%;
    width: 80%;
  }
  .item {
   margin-top:15px; 
   width: 100%;
   height: 20px;
  }
`


function SkeletonLoader() {
   
  return (
    <Container>
      <SkeletonRow/>
        {/* <Skeleton style={{backgroundColor:"black"}} width={'100vw'} height={'100vh'}  className="text"   /> */}
    </Container>
  )
}

export default SkeletonLoader



export const SkeletonRow = () => {
  return (
    <Container>

        <Rows className=''>

          {
            [1,2,3].map(()=>{
              return(
              <div className='row-item'>
                <Skeleton className='item-round'/>
                <Skeleton className='item'/>
                <Skeleton className='item'/>
              </div>
              )
            })
        
          }
           {/* <div className='row-item'>
           <Skeleton className='item'/>
           </div> */}

           {/* <Skeleton className='item'/> */}
        </Rows>

    </Container>
  )
}