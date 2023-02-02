import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import AccountIcon from '@mui/icons-material/AccountBoxOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import UploadIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginStart, logout} from "../../redux/userSlice";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
  background-color: ${({theme}) => theme.softColor};
    width: 250px;
  position: fixed;
  float: right;
  right: 45px;
  top: 50px;
  border-radius: 15px;
`;

const Wrapper = styled.div`
    padding: 20px;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 1px solid ${({theme}) => theme.colorHighlight};
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 20px;
  border-radius: 20px;
  
  :hover {
    background-color: ${({theme}) => theme.colorHighlight};
  }
`;

const ChannelImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const ChannelNick = styled.div`
  font-weight: 500;
  font-size: 18px;
`;

const Channel = styled.div`
  display: flex;
  gap: 25px;
  padding-bottom: 10px;
`;


const AccountDropdown = ({userImage, username, setOpen}) => {
    const dispatch = useDispatch();
    let dropdownRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        let handler = (e) => {
            try {
                if (!dropdownRef.current.contains(e.target)) {
                    setOpen(false);
                }
            }
            catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    })


    const logOut = async () => {
        dispatch(loginStart())

        try {

            await axios.get("http://localhost:8080/auth/signOut")
                       .then(setOpen(false))
                       .then(() => navigate("/"))
                       .then(dispatch(logout()))
                       .catch(err => console.log(err));
            console.log("logout")
        }
        catch (err) {
            return err;
        }
    }

    return (
        <Container>
            <Wrapper ref={dropdownRef}>
                <Channel>
                    <ChannelImage src={userImage}/>
                    <ChannelNick>{username}</ChannelNick>
                </Channel>
                <Hr />
                <Item>
                    <AccountIcon />
                    Your Account
                </Item>
                <Item>
                    <UploadIcon />
                    Upload
                </Item>
                <Item>
                    <SettingsIcon />
                    Settings
                </Item>
                <Item onClick={logOut}>
                    <LogoutIcon />
                    Logout
                </Item>
            </Wrapper>
        </Container>
    );
};

export default AccountDropdown;