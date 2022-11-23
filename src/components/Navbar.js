import React from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoIcon from "../img/LogoIcon.png";
import {Link} from "react-router-dom";

const Container = styled.div`
  color: ${({theme}) => theme.text};
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${({theme}) => theme.bg};
  height: 56px;
`;

const Wrapper = styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center; 
  gap: 5px;
  font-weight: bold;
  font-size: 18px;
`;

const Img = styled.img`
  height: 40px;
`;

const Search = styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;
  border: 1px solid ${({theme}) => theme.softColor};
  border-radius: 50px;
  :focus-within {
   border: 1px solid #3ea6ff;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;   
  width: 100%;
  font-size: large;
  padding-left: 15px;
  color: ${({theme}) => theme.text};
  outline: none;
  :focus {
    
  }
`;

const SearchButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 80px;
  background-color: ${({theme}) => theme.softColor};
  border-radius: 0 20px 20px 0;
`;

const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.softColor};
  font-size: 16px;
  gap: 5px;
  color: #3ea6ff;
  border-radius: 50px;
  cursor: pointer;
`;

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Link to={"/"} style={{textDecoration:"none", color:"inherit"}}>
                    <Logo>
                        <Img src={LogoIcon}/>
                        Youtube
                    </Logo>
                </Link>
                <Search>
                    <Input placeholder={'Search'}></Input>
                    <SearchButton>
                        <SearchOutlinedIcon />
                    </SearchButton>
                </Search>
                <Button>
                    <AccountCircleOutlinedIcon/>
                    Sign in
                </Button>
            </Wrapper>
        </Container>
    );
};

export default Navbar;