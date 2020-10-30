import React from "react";
import axios from 'axios';


class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            nameid: "",
            password: "",
            re_pw: "",
            emailCheck: "",
            nicknameCheck: "",
            pwCheck: ""
        };
    }
    //이메일 인풋창 핸들링
    handleEmail = e => {
        e.preventDefault();
        this.setState({
            email: e.target.value
        });
    };
    //이메일 중복검사
    checkEmail = e => {
        e.preventDefault();

        //이메일 유효성 검사 함수
        const chkEmail = function(str) {
            var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return regExp.test(str) ? true : false;
        };

        const inputEmail = {
            email: this.state.email
        };
        const email_info = {
            method: "POST",
            body: JSON.stringify(inputEmail),
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (chkEmail(this.state.email) === false) {
            alert("이메일 형식이 유효하지 않습니다.");
            this.setState({
                email: ""
            });
        } else {
            fetch("/api/v2/members", email_info)
                .then(res => res.json())
                .then(json => {
                    if (json === true) {
                        alert("사용가능 한 아이디입니다");
                        this.setState({
                            emailCheck: this.state.email
                        });
                    } else {
                        alert("이미 존재하는 아이디입니다");
                    }
                });
        }
    };

    //닉네임 인풋창 핸들링
    handleNickname = e => {
        e.preventDefault();
        this.setState({
            nameid: e.target.value
        });
    };
    //닉네임 중복검사
    checkNickname = e => {
        e.preventDefault();

        const chkNickname = function(str) {
            var regNm = /^[가-힣]{2,15}|[a-zA-Z]{2,15}\s[a-zA-Z]{2,15}$/;
            return regNm.test(str) ? true : false;
        };

        const inputnameid = {
            nameid: this.state.nameid
        };

        const nickname_info = {
            method: "POST",
            body: JSON.stringify(inputnameid),
            headers: {
                "Content-Type": "application/json"
            }
        };
        if (chkNickname(this.state.nameid) === false) {
            alert("한글,영문 대소문자 2~15자리만 사용 가능합니다");
        } else {
            fetch("api/v2/members", nickname_info)
                .then(res => res.json())
                .then(json => {
                    if (json === true) {
                        alert("사용 가능한 닉네임입니다.");
                        this.setState({
                            nicknameCheck: this.state.nameid
                        });
                    } else {
                        alert("이미 존재하는 닉네임입니다.");
                    }
                });
        }
    };
    //첫번째 패스워드 입력창 set변환
    handlePW = e => {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    };
    //두번째 패스워드 입력창 set변환
    handleRE_PW = e => {
        e.preventDefault();
        this.setState({
            re_pw: e.target.value
        });
    };
    //첫번 째 두번 째 패스워드 일치 확인
    checkPW = e => {
        e.preventDefault();

        //비밀번호 유효성검사(영문,숫자 혼합 6~20)
        const chkPwd = function(str) {
            var reg_pwd = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
            return !reg_pwd.test(str) ? false : true;
        };

        if (chkPwd(this.state.re_pw) === false) {
            alert("영문,숫자를 혼합하여 6~12자 이내");
            this.setState({
                password: "",
                re_pw: ""
            });
        } else {
            if (this.state.password === this.state.re_pw) {
                alert("일치합니다.");
                this.setState({
                    pwCheck: this.state.re_pw
                });
            } else {
                alert("불일치합니다.");
            }
        }
    };
    //서버로 가입 양식 제출
    handleSubmit = e => {
        e.preventDefault();
        const {
            email,
            emailCheck,
            nameid,
            nicknameCheck,
            pwCheck,
            password,
            re_pw
        } = this.state;

        const signupInfo = {
            email: this.state.emailCheck,
            password: this.state.pwCheck,
            nameid: this.state.nicknameCheck
        };

        const signup_info = {
            method: "POST",
            body: JSON.stringify(signupInfo),
            headers: {
                "Content-Type": "application/json"
            }
        };

        if (
            email &&
            nameid &&
            password &&
            re_pw
            // email === emailCheck &&
            // nameid === nicknameCheck &&
            // password === re_pw &&
            // re_pw === pwCheck
        ) {
            axios.post("/api/registor/members",{
                email ,
                nameid,
                password});


        } else {
            alert("입력값을 확인해주세요");
        }
    };

    render() {
        return (
            <div>
                <h1>Signup</h1>
                <br />
                <div>
                    <div>
                        <span>이메일</span>
                        <input placeholder="이메일을 입력하세요" value={this.state.email} onChange={this.handleEmail}></input>
                        <button onClick={this.checkEmail}>중복체크</button>
                    </div>
                    <div>
                        <span>닉네임</span>
                        <input placeholder="닉네임을 입력하세요" value={this.state.nameid} onChange={this.handleNickname}></input>
                        <button onClick={this.checkNickname}>중복체크</button>
                    </div>

                    <div>
                        <span>비밀번호</span>
                        <input placeholder="비밀번호 입력" value={this.state.password} onChange={this.handlePW}></input>
                    </div>
                    <div>
                        <span>비밀번호 재확인</span>
                        <input placeholder="비밀번호 재확인" value={this.state.re_pw} onChange={this.handleRE_PW}></input>
                        <button onClick={this.checkPW}>비밀번호 확인</button>
                    </div>

                    <div>
                        <button onClick={this.handleSubmit}>가입하기</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;



