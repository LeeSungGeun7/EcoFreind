import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import arrow from "../images/right-arrow.png"
import AxiosApi from "../api/AxiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from 'zod';


const Container = styled.div`
	p {
		color : pink;
		font-size: 15px;
	}
	* {
		box-sizing: border-box;
	}
  .container {
    background-color: mintcream ;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
  }
  .signUp {
    width: 450px;
    height: 780px;
    background-color: white;
    padding: 0 50px;
    margin-bottom: 20px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
  }
  h1 {
    align-self: center;
  }
	.inputBox{
		margin-top: 25px;
	}
	.Name {
		margin-top: 10px;
	}
	label {
		font-weight: bold;
		font-size: 1.2rem;
	}
	.do {
		background-color: #fff;
		color: white;
		margin-bottom: 40px;
		margin-top: auto;
		margin-left: auto;
	}
	.do:hover {
		background-color: #f5f5f5;
	}
	.do:active {
		background-color: #ededed;
	}
	.button {
		width: 60px;
		height: 60px;
		border: none;
		border-radius: 60px;
		font-size: 1.5rem;
	}
	.arrow {
		height: 100%;
		width: 100%;
	}
	.check{
		border: none;
		background-color: #ccc;
		border-radius: 5px;
		box-shadow: 0 2px 3px rgba(0,0,0,0.25), 0 1.5px 1.5px rgba(0,0,0,0.22);
		margin-left: 10px;
		height: 25px;
	}
	.check:active {
		background-color: #b0b0b0;
	}
	.inputInfo {
		width: 80%;
	}
	.btn-confirm {
		height: 45px;
		width: 35%;
		border: none;
		background-color: royalblue;
		color: white;
	}
	.btn-confirm:active {
		background-color: #25a;
	}
	.confirm {
		height: 45px;
		width: 65%;
		padding: 0 2vw;
		outline: none;
		border: none;
		background-color: #eee;
	}
	.success {
    color: royalblue;
		font-size: .5rem;
  }
  .error {
    color: red;
		font-size: .5rem;
  }
	select {
		height: 25px;
		width: 20%;
		outline: none;
		border: none;
		background-color: #f3f3f3;
		margin-right: 7px;
	}
	.tel {
		border: none;
		background-color: #eee;
		width: 25%;
		height: 25px;
		margin: 0 7px;
		outline: none;
		padding: 0 15px;
	}
`
const Input = styled.input`
	width: 100%;
	height: 25px;
	border-left-width: 0;
	border-right-width: 0;
	border-top-width: 0;
	border-bottom-width: 1px;
	outline: none;
	margin-top: 5px;
	font-size: 1rem;
	
`
const SignUp = () => {
	const navigate = useNavigate("");
	// 입력 란
	const [errors, setErrors] = useState({
		email: null,
	});
	const [formData , setFormData] = useState({
		name : "" ,
		email : "" , 
		password : "" ,
		gender : "" ,
		phone : "" , 
		address : "" ,	
		emailcheck : false 
	})
	const SignUpSchema = z.object({
		name: z.string().min(1,"최소 1글자이상 적어주세요").max(10,"글자수 10자 초과하셨습니다."),
		email: z.string().email({message:"유효하지않은 이메일 형식"}),
		gender : z.string().min(1,"성별을 선택해주세요") ,
		phone : z.string().min(10,"핸드폰 번호를 입력해주세요"),
		address: z.string().min(1,"주소를 입력해주세요"),
		password: z.string().min(8).regex(/[A-Z]/, "비밀번호에 대문자가 필요합니다"),
		emailcheck: z.boolean(),
	  })
	  .refine(data => data.emailcheck === true, {
		message: "이메일 인증이 되지않았습니다.",
		path: ["email"],
	  })
	
	  ;



	// 중복 확인
	const [emailConfirm, setEmailConfirm] = useState(false);
	// 발급받은 키 값
	const [keyCode, setKeyCode] = useState("");
	// 키 일치 여부


	const [keyConfirm, setKeyConfirm] = useState(false);


	const location = useLocation();

	// 이메일 정규식 확인
	const onChangeEmail = (e) => {
		const newEmail = e.target.value;
		setFormData({...formData, email: newEmail});
		
		try {
		  SignUpSchema.shape.email.parse(newEmail);
		  setErrors({...errors, email: null});
		} catch (error) {
			console.log(error)
		//   setErrors({...errors, email: error.errors[0].message});
		}
	  };

	const onChangeGender = (e) => {
		setFormData({...formData,gender:e.target.value});
	}

	// 중복확인
	const onClickEmailCheck = async () => {
		const res = await AxiosApi.emailcheck(formData.email)
		if (res.status=== 200) {
			if (res.data) {
				setErrors({...errors, email: "이미 존재 하는 이메일 입니다."})
			} else {
				setEmailConfirm(true)
			}
		}
	}

	const emailcodeCheck = async () => {
		const res = await AxiosApi.codecheck(formData.email,keyCode)
		if (res.status === 200) {
			if (res.data) {
				alert('확인 되었습니다.')
				setFormData({...formData,emailcheck:true})
			} else {
				alert('인증실패')
			}
		}
	}

	

	const handleSubmit =async (e) => {
	  e.preventDefault();
	  console.log(formData);
	  try {
		SignUpSchema.parse(formData);
		
		const res = await AxiosApi.signUP(formData)
		if (res.status === 200){
			if (res.data) {
				alert("회원가입이 완료 되었습니다.")
				navigate('/login')
			}
		}

	  } catch (error) {
		const formattedErrors = {};
		error.errors.forEach(e => {
		  formattedErrors[e.path[0]] = e.message;
		});
		setErrors(formattedErrors);
	  }
	};



	// 인증하기
	const onChangeKey = (e) => {
		setKeyCode(e.target.value);
	}

	const onClickGetKey = async () => {
		const res = await AxiosApi.codesend(formData.email);
		if(res.status === 200) {
			alert('인증메일이 발송 되었습니다.')
			setKeyConfirm(true)
		} 
	}

	const onChangePwd = (e) => {
		setFormData({...formData,password: e.target.value});
	}

	const onChangePhone = e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
		setFormData({...formData,phone:e.target.value});
	}

	const onChangeAddress = (e) => {
		setFormData({...formData,address:e.target.value});
	}
	const openDaumAddress = () => {
		new window.daum.Postcode({
      oncomplete: function(data) {
        setFormData({...formData,address:data.address});
      },
    }).open();
	}


	

	return (
		<Container>
			<Header />
			<form onSubmit={handleSubmit} className="container">
				<div className="signUp">
					<h1>회원가입</h1>
					<div className="inputBox Name">
						<label id="name">이름</label>
						<Input name="name" type="text" placeholder="ex) 홍길동" value={formData.name} onChange={e => { setFormData({...formData,name:e.target.value}) }} />
						{errors.name && <p >{errors.name}</p>}
					</div>
					<div className="inputBox">
						<label id="gender">성별</label>
						<br></br>
						<select name="gender" onChange={onChangeGender}>
							<option value="">선택</option>
							<option value="M">남자</option>
							<option value="F">여자</option>
						</select>
						{errors.gender && <p>{errors.gender}</p>}
					</div>
					<div className="inputBox">
						<label  id="email">이메일</label><br></br>
						<Input
							disabled={formData.emailcheck}
							className="inputInfo"
							name="email"
							type="text"
							placeholder="ex) example@example.com"
							value={formData.email}
							onChange={onChangeEmail}
						/>
						<button disabled={formData.emailcheck} className="check" onClick={onClickEmailCheck}>중복확인</button>
						{errors.email && <p>{errors.email}</p>}
					</div>
					{/* {formData.email.length > 0 && <span className={`${emailReg && emailConfirm ? "success" : "error"}`}>{idMessage}</span>} */}

					{emailConfirm &&
						<div className="inputBox">
							<input disabled={formData.emailcheck} className="confirm" type="text" placeholder="인증번호 입력" onChange={onChangeKey} />
							{	
								!keyConfirm ? 
								<button disabled={formData.emailcheck} className="btn-confirm" onClick={onClickGetKey}>인증번호 발급</button>
								: 
								<button disabled={formData.emailcheck} className="btn-confirm" onClick={emailcodeCheck}>인증번호 확인</button>
							}
							{/* <button className="check" onClick={onConfirmKeyCode}>인증하기</button>  */}
						</div>
					}
					<div className="inputBox">
						<label id="password">비밀번호</label>
						<Input
							name="password"
							type="password"
							placeholder="영문자, 숫자, 특수문자를 포함한 8~25자"
							value={formData.password}
							onChange={onChangePwd}
						/>
						{/* {formData.pwd.length > 0 && <span className={`${pwdReg ? "success" : "error"}`}>{pwMessage}</span>} */}
					</div>
					<div className="inputBox">
						<label id="phone">전화번호</label>
						<Input maxLength={13} name="phone" type="text" placeholder="'-' 제외하고 입력" value={formData.phone} onChange={onChangePhone}/>
						{errors.phone && <p>{errors.phone}</p>}
					</div>
					<div className="inputBox">
						<label id="addr">주소</label>
						<br></br>
						<Input name="address" className="inputInfo" type="addrdess" placeholder="ex) 서울특별시 강남구 테헤란로" value={formData.address} onChange={onChangeAddress}/>
						<button className="check"  onClick={openDaumAddress}>주소찾기</button>
						{errors.address && <p>{errors.address}</p>}
					</div>
					<button className="button do" type="submit" >
						<img className="arrow"  src={arrow} alt="right-arrow" />
					</button>
					<input value={formData.emailcheck} type="text" style={{display:'none'}} name="emailcheck" />
				</div>
			</form>
		</Container>
	);
};

export default SignUp;