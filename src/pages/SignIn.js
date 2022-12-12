import React from 'react';
import styled from "styled-components";
import Menu from "../components/Menu";

const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px 100px;
  background-color: ${({theme}) => theme.bgLighter};
  border: 1px solid ${({theme}) => theme.softColor};
`;

const Title = styled.h1`
    font-size: 24px;
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

const SignIn = ({darkMode, setDarkMode}) => {
    return (
        <Container>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
            <ContentWrapper>
                <SignInForm>
                    <Title>Sign in</Title>
                    <Input placeholder={"username"}/>
                    <Input type={"password"} placeholder={"password"}/>
                    <Button>Sign in</Button>
                    <Title>or</Title>
                    <Input placeholder={"username"}/>
                    <Input placeholder={"email"}/>
                    <Input type={"password"} placeholder={"password"}/>
                    <Button>Sign up</Button>
                </SignInForm>
            </ContentWrapper>
        </Container>
    );
};

export default SignIn;