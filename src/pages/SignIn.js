import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Menu from "../components/Menu";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {loginFail, loginStart, loginSuccess} from "../redux/userSlice";
import {useNavigate} from "react-router-dom";
import {auth, provider} from "../firebase";
import { signInWithPopup } from "firebase/auth";
import GoogleLogo from "../img/Google.png";

const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  width: 100%;
  height: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 70px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px 100px;
  background-color: ${({theme}) => theme.bgLighter};
  border: 1px solid ${({theme}) => theme.softColor};
`;

const Title = styled.h1`
    font-size: 24px;
`;

const Error = styled.h4`
    color: indianred;
  margin: 5px 0 0 0;
`;

const Input = styled.input`
  border: 1px solid ${({theme}) => theme.colorHighlight};
  font-size: 14px;
  color: ${({theme}) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 10px 0;
  width: 80px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  font-size: 16px;
  font-weight: 400;
  gap: 5px;
  color: #3ea6ff;
  border-radius: 50px;
  cursor: pointer;
`;

const Google = styled.a`
  display: flex;
    background-color: #3ea6ff;
  padding: 5px 15px;
  border-radius: 20px;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: aliceblue;
  padding: 5px;
`;

const SignIn = ({darkMode, setDarkMode}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.reducer);


    useEffect(() => {
        dispatch(loginStart())
    }, []);

    const login = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8080/auth/signIn", {name, password}, {withCredentials: true})
                   .then(res => {
                       dispatch(loginSuccess(res.data))
                   })
                   .then(() => {
                       navigate("/")
                   })
                   .catch((err) => {
                       dispatch(loginFail(err.response.data))
                   })
    }

    const register = async (e) => {
        e.preventDefault()

        await axios.post("/auth/signUp", {name, email, password})
            .then(() => login(e))
            .catch(err => {

            })
    }

    const signInWithGoogle = async () => {

        await signInWithPopup(auth, provider)
            .then((result) => {
                return axios.post("/auth/google", {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL,
                })
            })
            .then((response) => dispatch(loginSuccess(response.data)))
            .catch(() => {
                dispatch(loginFail());
            });
    }

    const loginError = () => {
        if (user.error === "User not found" || user.error === "Incorrect password") {
            return <Error>{user.error}</Error>
        }
    }


    return (
        <Container>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
            <ContentWrapper>
                <SignInForm>
                    <Title>Sign in</Title>
                    <Input placeholder={"username"} onChange={e => setName(e.target.value)}/>
                    <Input type={"password"} placeholder={"password"} onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={login}>Sign in</Button>
                    {loginError()}
                    <Title>Sign up</Title>
                    <Input placeholder={"username"} onChange={e => setName(e.target.value)}/>
                    <Input placeholder={"email"} onChange={e => setEmail(e.target.value)}/>
                    <Input type={"password"} placeholder={"password"} onChange={e => setPassword(e.target.value)}/>
                    <Button onClick={register}>Sign up</Button>
                    <Google onClick={signInWithGoogle}>
                        <Image src={GoogleLogo}/>
                        Continue with Google
                    </Google>
                </SignInForm>
            </ContentWrapper>
        </Container>
    );
};

export default SignIn;