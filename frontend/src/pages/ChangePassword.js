import React, { useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import AxiosApi from "../api/AxiosApi";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";

const Container = styled.div`
    * {
        box-sizing: border-box;
    }

    .Container {
        background-color: mintcream;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 100%;
        min-width: 780px;
    }

    .TopMenu {
        display: flex;
        width: 100%;
        height: 60px;
        background-color: #D9D9D9;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        list-style: none;
    }

    .top_findId, .top_findPw {
        text-decoration: none;
        color: #FFF;
        font-size: 20px;
        margin: 0 30px;
    }

    .top_findId:hover  {
        color: yellow;
    }

    .top_findPw:hover {
        color: yellow;
    }

    .changePw {
        display: flex;
        min-width: 450px;
        min-height: 400px;
        margin: 100px;
        padding: 0 50px;
        background-color: white;
        flex-direction: column;
        border: 1px solid gray;
        align-items: center;
    }
    .title {
        margin: 50px;
    }

    .inputBox {
        width: 90%;
        height: 40px;
        border-radius: solid 5px;
    }
    
    .checkBtn {
        display: flex;
        width: 90%;
        height: 40px;
        margin: 30px;
        border: 1px;
        background-color: black;
        align-items: center;
        justify-content: center;
        color: #FFF;
        text-decoration: none;
        font-size: 20px;
        border-radius: 5px;
    }

    .success {
        color: royalblue;
        font-size: .5rem;
    }

    .error {
        color: red;
        font-size: .5rem;
    }

`
const Input = styled.input`
    width: 90%;
    height: 40px;
    border-radius: solid 5px;
    margin: 10px;
`

const ChangePassword = () => {
    const {changeId} = useAuth();

    // 입력란
    const [pwd, setPwd] = useState("");
    const [pwdConfirm, setPwdConfirm] = useState("");

    // 정규식 유효성 검사
    const [pwdReg, setPwdReg] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    
    // 오류 메세지
    const [pwMessage, setPwMessage] = useState("");
    const [pwConfirmMessage, setPwConfirmMessage] = useState("");

    const onChangePwd = (e) => {
		const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
		setPwd(e.target.value);
		if (!passwordRegEx.test(e.target.value)) {
			setPwMessage('올바른 형식이 아닙니다.')
			setPwdReg(false);
		} else {
			setPwMessage('사용가능한 비밀번호 입니다.')
			setPwdReg(true);
		}
	}

    const onChangePwdConfirm = (e) => {
        const passwordConfirm = e.target.value
        setPwdConfirm(passwordConfirm);
        if(pwd === passwordConfirm) {
            setPwConfirmMessage('비밀번호가 일치합니다.')
            setIsPasswordConfirm(true);
        } else {
            setPwConfirmMessage('비밀번호가 일치하지 않습니다.')
            setIsPasswordConfirm(false);
        }
    }

    const onClickChangePassword = async () => {
		AxiosApi.updatePassword(changeId,pwd);
	}

    return(
        <>
          <Header />
        <Container>
          
            <div className="Container">
                <div className="TopMenu">
                    <a href="/FindID" className="top_findId"><li>아이디 찾기</li></a>
                    <a href="/TypedID" className="top_findPw"><li>비밀번호 찾기</li></a>
                </div>
                <div className="changePw">
                    <h2 className="title">비밀번호 변경</h2>
                    <input 
                        placeholder="새 비밀번호" 
                        type="password"
                        onChange={onChangePwd}
                        />
                        {pwd.length > 0 && <span className={`${pwdReg ? "success" : "error"}`}>{pwMessage}</span>}
                    <input 
                        placeholder="새 비밀번호 확인" 
                        type="password"
                        onChange={onChangePwdConfirm}
                        />
                        {pwdConfirm.length > 0 && <span className={`${isPasswordConfirm ? "success" : "error"}`}>{pwConfirmMessage}</span>}
                        

                    <a href="/" className="checkBtn" onClick={onClickChangePassword}><sapn className="checkButton">확인</sapn></a>
                </div>
            </div>
            <Footer />
        </Container>
        </>
    );
};
export default ChangePassword;
