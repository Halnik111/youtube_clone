import React, {useState} from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import LogoIcon from "../../img/LogoIcon.png";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import AccountDropdown from "./AccountDropdown";

const Container = styled.div`
  color: ${({theme}) => theme.text};
  position: fixed;
  width: 100%;
  top: 0;
  background-color: ${({theme}) => theme.bg};
  height: 56px;
  z-index: 1;
`;

const Wrapper = styled.div`
    display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
`;

const AccountWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-right: 25px;
`;

const NotificationButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  
  :hover {
    background-color: ${({theme}) => theme.colorHighlight};
  }
`;

const ChannelImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: aliceblue;
  cursor: pointer;
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

const Button = styled.div`
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
    const [open, setOpen] = useState(false);
    const {user} = useSelector(state => state.reducer.user);

    const dropdown = () => {
        if (open) {
            return <AccountDropdown setOpen={setOpen} userImage={user.image} username={user.name} userEmail={user.email}/>
        }
    }

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
                {user ?
                    <AccountWrapper>
                        <NotificationButton>
                            <NotificationsIcon fontSize={"medium"}/>
                        </NotificationButton>
                        <ChannelImage src={user.image} onClick={() => setOpen(!open)}></ChannelImage>
                        {dropdown()}
                    </AccountWrapper>
                    :
                    <Link to={"signIn"} style={{textDecoration: "none"}}>
                        <Button>
                            <AccountCircleOutlinedIcon/>
                            Sign in
                        </Button>
                    </Link>
                }
            </Wrapper>
        </Container>
    );
};

export default Navbar;