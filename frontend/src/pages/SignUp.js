import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../layout/Header";
import AxiosApi from "../api/AxiosApi";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { authApi } from "../api/auth";
import { motion } from "framer-motion";
import { media } from "../styles/media";
import { Common } from "../styles/theme";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import debounce  from 'lodash/debounce';
import { FaArrowRight ,FaCheck } from "react-icons/fa";




const Container = styled.div`
	position:relative;
	display:flex;
	justify-content:center;
	align-items:center;
	background-color: white;
	flex-direction:column;
	width: 100vw;
	height: 100vh;
	.right {
		font-size: 2rem;
		position: absolute;
		bottom: 10%;
		right: 10%;
	}
	.step {
		width: 80%;
		height:90px;

		/* background-color:silver; */

		display:flex;
		justify-content:end;
		align-items:center;
		${
		media.phone`
		width: 100%;
		` 
		}
	
	}
	.allow-container {
		height: 40%;
	}
	.all-btn {
		padding : 1rem;
		background-color: black;
		color:white;
		border:none;
	}
	
`

const FormBar = styled(motion.form)`
	${Common.center}
	justify-content:space-evenly;
	flex-direction:column;
	/* background-color: ${props=> props.theme.colors.blue}; */
	
	width: 80%;
	height: 70%;
	
	${
	media.phone`
	width: 100%;
	height: 100%;
	` 
	}
	.textgroup {
		${Common.center};
		width : 100%;
		justify-content: start;
	}
	.input {
		width : 70%;
		margin: 20px;
		${media.phone`
			width: 70%;
			margin : 10px;
			margin-left: 30px;
		`}
	}
	button {
		margin : auto;
		${media.phone`
			font-size: 0.6rem;
			width: 20px;
			//margin : 10px;
		`}
		font-size: 0.7rem;



		
		background-color: ${props=> props.theme.colors.white};
	}
`

const StepsContainer = styled(motion.div)`
	margin-right : auto;
	display:flex;
	justify-content: space-evenly;
	width: 100%;

	div {
		width: 70px;
		height: 70px;
		color: blue;
		background-color: white;
		border-radius: 50px;
		font-size: 0.8rem;
		${Common.center}
		color:white;
	}
	.step-1 {
		background-color : ${props=> props.step === 1 ? props.theme.colors.blue : 'silver'};
		background-color : ${props=> props.step > 1 && '#98FB98'};
		
	}
	.step-2 {
		background-color : ${props=> props.step === 2 ? props.theme.colors.blue : 'silver'};
		background-color : ${props=> props.step > 2 && '#98FB98'};
		color:white;
	}
	.step-3 {
		background-color : ${props=> props.step === 3 ? props.theme.colors.blue : 'silver'};
	}
`

const Steps = ({step}) => {
	return(
		<>
		 <StepsContainer step={step}>
			<div className="step-1">
				정보입력
			</div>	
			<div className="step-2">
				약관동의
			</div>	
			<div className="step-3">
				완료
			</div>		
		 </StepsContainer>
		</>
	)
}


const SignUp = () => {
	const navigate = useNavigate("");
	// 입력 란
	const [errors, setErrors] = useState({
		email: null,
	});
	const SignUpSchema = z.object({
		name: z.string().min(1,"최소 1글자이상 적어주세요").max(10,"글자수 10자 초과하셨습니다."),
		email: z.string().email({message:"유효하지않은 이메일 형식"}),
		password: z.string().regex(/^(?=.*[a-zA-Z])(?=.*\d)/, "비밀번호는 영문자와 숫자가 포함되어야 합니다"),
		passwordCheck : z.string(),
		emailcheck: z.boolean(),
	  })
	

	  const SignUpCheckSchema = SignUpSchema.refine(data => data.emailcheck === true, {
			message: "이메일 인증이 되지않았습니다.",
			path: ["email"],
		  })
		  .refine(data => data.password === data.passwordCheck, {
			message: "패스워드가 일치하지 않습니다.",
			path: ["passwordCheck"]
		  })
	  ;

	const [formData , setFormData] = useState({
		name : "" ,
		email : "" , 
		password : "" ,
		passwordCheck : "",
		emailcheck : false 
	})
	
	const [ServiceAllowCheck , setServiceAllowCheck] = useState({
		service : false ,
		location : false 
	})


	// 중복 확인
	const [emailConfirm, setEmailConfirm] = useState(false);
	// 발급받은 키 값
	const [keyCode, setKeyCode] = useState("");
	// 키 일치 여부


	const [keyConfirm, setKeyConfirm] = useState(false);

	const err = () => {
		console.log(JSON.stringify(formData));
	}



	// 중복확인
	const onClickEmailCheck = async () => {
		const res = await authApi.emailcheck(formData.email)
		if (res.status=== 200) {
			if (res.data) {
				setErrors({...errors, email: "이미 존재 하는 이메일 입니다."})
			} else {
				setEmailConfirm(true)
				onClickGetKey();
			}
		}
	}

	const emailcodeCheck = async () => {
		const res = await authApi.codecheck(formData.email,keyCode)
		if (res.status === 200) {
			if (res.data) {
				alert('확인 되었습니다.')
				setFormData({...formData,emailcheck:true})
			} else {
				alert('인증실패')
			}
		}
	}


	const passwordCheck = () => {
		if (formData.passwordCheck !== formData.password) {
			setErrors({...errors,passwordCheck : false})
		  }
	}

	

	

	const handleSubmit =async (e) => {
	  e.preventDefault();
	  try {
		SignUpSchema.parse(formData);
		const res = await authApi.signUP(formData)
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


	const nextStepForm = async () =>  {
		try {
		SignUpCheckSchema.parse(formData)
		} catch (error) {
			const formattedErrors = {};
			error.errors.forEach(e => {
			formattedErrors[e.path[0]] = e.message;
			});
			setErrors(formattedErrors);
			alert('not valid')
			return
		}
		nextStep();
	}


	const onClickGetKey = async () => {
		const res = await authApi.codesend(formData.email);
		if(res.status === 200) {
			alert('인증메일이 발송 되었습니다.')
			setKeyConfirm(true)
		} 
	}

	const [step, setStep] = useState(1);
	const nextStep = () => { setStep(step+1) }
	const prevStep = () => { setStep(step-1) }



	const handelChange = debounce((e , name) => {
		const newValue = e.target.value 

		setFormData(prevData => ({...prevData, [name] : newValue}) )


		if (SignUpSchema && SignUpSchema.shape[name]) {
			const validationResult = SignUpSchema.shape[name].safeParse(newValue);
			if (!validationResult.success) {
			  setErrors(prevErrors => ({
				...prevErrors,
				[name]: validationResult.error.errors[0].message
			  }));
			} else {
			  setErrors(prevErrors => ({...prevErrors, [name]: null}));
			}
		}		
	},200)		


	const handleAllCheck = () => {
		setServiceAllowCheck({ service:true , location: true})
	}

	const handleCheck = () => {
		setServiceAllowCheck({ service:true , location: true})
	}



	switch (step) {
		case 1:
			return(
				
			<>
			<Header/>
			<Container>
				{
					step < 3 &&
					errors &&
					<FaArrowRight onClick={nextStepForm} className="right"/>
				}
			<div className="step">
				<Steps step={step}/>				
			</div>
				<FormBar onSubmit={ handleSubmit }
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				>

					<div className="textgroup">
						<TextField
						className="input"
						onChange={(e)=>{handelChange(e,'name')}}
						error={!!errors.name}
						helperText={errors.name}
						name="name"
						id="name"
						label="닉네임"
						/>
					</div>
					
					<div className="textgroup">
					<TextField
					className="input"
					name="email"
					error={!!errors.email}
  					helperText={errors.email}
					onChange={(e)=>{handelChange(e,'email')}}
					id="outlined-error"
					label="이메일"
					/>
					{
						!emailConfirm &&
						<Button disabled={errors.email} onClick={onClickEmailCheck}>인증코드</Button>
					}

					</div>
					{
					emailConfirm && 
					<div className="textgroup">
					<TextField	
					className="input"
					error={!!errors.password}
					helperText={errors.password}
					onChange={(e)=>{setKeyCode(e.target.value)}}
					type="number"
					maxlength={8}
					id="outlined-error"
					label="이메일 코드키"
					/>
					<Button onClick={emailcodeCheck}>인증코드 확인</Button> 
					</div>
					}
					
					<div className="textgroup">
					<TextField	
					className="input"
					type='password'
					error={!!errors.password}
					helperText={errors.password}
					name="password"
					onChange={(e)=>{handelChange(e,'password')}}
					id="outlined-error"
					label="패스워드"
					/>
					</div>

					<div className="textgroup">
					<TextField
					className="input"
					error={!!errors.passwordCheck}
					helperText={errors.passwordCheck}
					type='password'
					name="passwordCheck"
					onChange={(e)=>{handelChange(e,'passwordCheck');passwordCheck()}}
					id="outlined-error"
					label="패스워드 확인"
					/>
					</div>
			

				</FormBar>
					
			</Container>	
			</>
			)
		case 2:
			return(
				<>
			<Header/>
			<Container>
			<FaArrowRight onClick={handleSubmit} className="right"/>
			<div className="step">
				<Steps step={step}/>				
			</div>

				
				<div className="allow-container">
						<h1>서비스 가입</h1>
						<p>서비스 시작 및 가입을 위해 먼저</p>
						<p>가입 및 정보 제공에 동의해 주세요.</p>
				</div>
					<button className="all-btn">
						<FaCheck onClick={handleAllCheck}/> 전체 동의 
					</button>
					<SelectLabel content={"test..."} checked={ServiceAllowCheck.service} title={"서비스이용약관"}/>
					<SelectLabel content={"test..."} checked={ServiceAllowCheck.location} title={"서비스이용약관"}/>
				
				
					
			</Container>	
			</>
			)		
			
	
		default:
			return null;
	}

};

export default SignUp;


const SelectLabels = styled(motion.div)`
	display:flex;
	align-items :center;
	justify-content:space-evenly;
	width: 100%;
	margin-bottom: 50px;
	cursor: pointer;
	.check {
		margin : 10px;
		color : ${props => props.checked ? "#0AD1F8" : ""}
	}
	button {
		border: none;
		cursor: pointer;
		width:	40px;
		height: 30px;
		background-color: ${props=> props.theme.colors.blue};
		color: white;
	}
	
`;
const SelectContainer = styled.div`


`;

const SelectLabel = ({ title , content , checked , onClick  }) => {
	
	return (
		<>
		<SelectLabels checked={checked}>
			<FaCheck className="check"  />
			<p>{title}</p>
			<button>접기</button>
		</SelectLabels>
			{
				checked && 
				<div className="">
					{content}
				</div>
			}
			
			
		</>
	)
}

