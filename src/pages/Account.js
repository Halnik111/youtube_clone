import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import SubscribeButton from "../components/SubscribeButton";
import Card from "../components/Card";


const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: 85px 150px 0 150px;
  
`;

const VideoLibrary = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin: 0 55px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: 1fr;

  @media screen and (min-width: 1650px) {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
`;

const AccountBanner = styled.div`
  display: flex;
  justify-content: space-around;
  height: 200px;
  border-bottom: 2px solid ${({theme}) => theme.softColor};
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


const Account = () => {
    const [channel, setChannel] = useState({});
    const { user } = useSelector(state => state.reducer.user);
    const path = useLocation().pathname.split("/")[2];
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchChannel();
        fetchVideos();
    },[path]);

    const fetchChannel = async () => {
        await axios.get(`http://localhost:8080/users/find/${path}`, {withCredentials: true})
                   .then(res => {
                       setChannel(res.data);
                   })
                   .catch(console.log);
    }

    const fetchVideos = async () => {
        await axios.get(`http://localhost:8080/videos/channel/${path}`, {withCredentials: true})
                   .then(res => {
                       setVideos(res.data);
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

    const displayVideos = () => {
            return videos?.map(video => <Card key={video._id} video={video}/>)
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
            <VideoLibrary>
                {
                    displayVideos()
                }
            </VideoLibrary>
        </Container>
    );
};

export default Account;