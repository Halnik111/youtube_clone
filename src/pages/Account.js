import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import SubscribeButton from "../components/SubscribeButton";
import AccountVideos from "../components/Account/AccountVideos";
import AccountChannels from "../components/Account/AccountChannels";
import AccountAbout from "../components/Account/AccountAbout";
import AccountLibrary from "../components/Account/AccountLibrary";


const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 85px 150px 0 150px;
  
`;

const AccountBanner = styled.div`
  display: flex;
  justify-content: space-around;
  height: 200px;
`;

const AccountWrapper = styled.div`
    display: flex;
  gap: 30px;
`;


const ChannelImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const ChannelDetails = styled.div`
    
`;

const Username = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 10px 0;
  color: ${({theme}) => theme.text};
`;

const Info = styled.div`
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;
  color: ${({theme}) => theme.textSoft};
`;

const About = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({theme}) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
    gap: 25px;
`

const Button = styled.div`
  cursor: pointer;
  border-radius: 20px;
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({theme}) => theme.softColor};

  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${({theme}) => theme.softColor};
`;

const NavigationButton = styled.div`
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  box-sizing: content-box;
  color: ${({theme}) => theme.textSoft};
  margin: 0;
  padding: 0 25px;
  border-bottom: 3px solid transparent;
  
  :hover {
    color: ${({theme}) => theme.bgOpposite};
  }
  
  :nth-child(${(props) => props.activeSection}) {
    color: ${({theme}) => theme.bgOpposite};
    border-bottom: 3px solid ${({theme}) => theme.bgOpposite};
  }
`;


const Account = () => {
    const [channel, setChannel] = useState({});
    const { user } = useSelector(state => state.reducer.user);
    const path = useLocation().pathname.split("/")[2];
    let location = useLocation();
    const navigate = useNavigate();
    const [section, setSection] = useState('');


    useEffect(() => {
        fetchChannel();
        setSection(location.state.toString());
        console.log(location.state.toString());
    },[path]);

    const fetchChannel = async () => {
        await axios.get(`/api/users/find/${path}`, {withCredentials: true})
                   .then(res => {
                       setChannel(res.data);
                   })
                   .catch(console.log);
    }

    const actionButtons = () => {
        if (user?._id === path) {
            return (
                <Buttons>
                    <Button>
                        Customize Channel
                    </Button>
                    <Button>
                        Manage Videos
                    </Button>
                </Buttons>
            )

        }
        else {
            return user ?
                    <SubscribeButton user={user} channel={channel} setChannel={setChannel}/>
                    :
                    <Button onClick={() => navigate("/signIn")}>Sign in to Sub</Button>

        }
    }

    const displayContent = () => {
        console.log(section);
        switch (section) {
            case "1": return <AccountVideos path={path}/>
            case "2": return <AccountChannels channel={channel}/>
            case "3": return <AccountLibrary channel={channel}/>
            case "4": return <AccountAbout channel={channel}/>
        }
    }


    return (
        <Container>
            <AccountBanner>
                    <AccountWrapper>
                        <ChannelImage src={channel.image?.replace("s96-c", "s240-c", true)}/>
                        <ChannelDetails>
                            <Username>
                                {channel.name}
                            </Username>
                            <Info>
                                {channel.email} • {channel.subscribers} Subscribers • 0 Videos
                            </Info>
                            <About>
                                Nikolas Halo about section testing font size, esthetics and positioning.
                            </About>
                        </ChannelDetails>
                    </AccountWrapper>
                {actionButtons()}
            </AccountBanner>
            <NavigationButtons>
                <NavigationButton activeSection={section} onClick={() => setSection("1")}>
                    Home
                </NavigationButton>
                <NavigationButton activeSection={section} onClick={() => setSection("2")}>
                    Channels
                </NavigationButton>
                <NavigationButton activeSection={section} onClick={() => setSection("3")}>
                    Playlists
                </NavigationButton>
                <NavigationButton activeSection={section} onClick={() => setSection("4")}>
                    About
                </NavigationButton>
            </NavigationButtons>

            {displayContent()}
        </Container>
    );
};

export default Account;