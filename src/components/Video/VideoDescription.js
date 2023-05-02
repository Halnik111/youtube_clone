import React, {useEffect, useState} from 'react';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ShareIcon from '@mui/icons-material/ReplyOutlined';
import SaveIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import styled, {css} from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import {likes, dislikes} from "../../redux/videoSlice";
import {useNavigate} from "react-router-dom";
import SubscribeButton from "../SubscribeButton";

const blueColor = css`
  color: ${(props) => (props.changeColor? "#3ea6ff" : "inherit")}
`;

const Container = styled.div`
  margin: 20px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  height: 36px;
`;

const User = styled.div`
  display: flex;
  gap: 20px;
  margin-right: auto;
  margin-bottom: 20px;
  height: 36px;
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({theme}) => theme.colorHighlight};

  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
`;

const RatingButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({theme}) => theme.colorHighlight};
`;

const RatingButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0 20px 20px 0;
  padding:6px 15px 6px 10px;
  
  ${blueColor};
  
  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
  
  :nth-child(1) {
    border-right: 1px solid ${({theme}) => theme.softColor};
    border-radius: 20px 0 0 20px;
    padding-left: 10px;
    gap: 10px;
  };
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  color: ${({theme}) => theme.text};
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: aliceblue;
  cursor: pointer;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Username = styled.div`
  font-size: 15px;
  font-weight: 500;
`;

const Subscribers = styled.div`
    font-size: 12px;
  font-weight: 400;
  color: ${({theme}) => theme.textSoft};
`;

const Info = styled.div`
  background-color: ${({theme}) => theme.colorHighlight};
  padding: 15px;
  margin-top: 20px;
  min-height: 80px;
  border-radius: 10px;
`;

const VideoDescription = ({video, user}) => {
    const [likeColor, setLikeColor] = useState(false);
    const [dislikeColor, setDisLikeColor] = useState(false);
    const [channel, setChannel] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const date = new Date(video.createdAt);


    useEffect(  () => {
        if (user) {
            setLikeColor(video.like.includes(user._id))
            setDisLikeColor(video.dislike.includes(user._id))
        }

            const fetchChannel = async () => {
                await axios.get(`http://localhost:8080/users/find/${video.userId}`, {withCredentials: true})
                           .then(res => {
                               setChannel(res.data);
                           })
                           .catch(console.log);
            }
            fetchChannel();

    }, [channel._id, video]);

    const likeVideo = async () => {
        if (user) {
            await axios.put(`http://localhost:8080/users/like/${video._id}`,{}, {withCredentials: true});
            dispatch(likes(user._id))
            setLikeColor(!likeColor);
            setDisLikeColor(false);
        }
    }

    const dislikeVideo = async () => {
        if (user) {
            await axios.put(`http://localhost:8080/users/dislike/${video._id}`, {}, {withCredentials: true});
            dispatch(dislikes(user._id))
            setDisLikeColor(!dislikeColor);
            setLikeColor(false)
        }
    }



    return (
        <Container>
            <Title>
                {video.videoTitle}
            </Title>
            <Wrapper>
            <User>
                <ChannelImage src={channel.image} onClick={() => navigate(`/account/${channel._id}`, {state: 1})}/>
                <UserDetails onClick={() => navigate(`/account/${channel._id}`, {state: 1})}>
                    <Username>
                        {channel.name}
                    </Username>
                    <Subscribers>
                        {channel.subscribers} Subscribers
                    </Subscribers>
                </UserDetails>
                <Button>
                    Join
                </Button>
                {user ?
                    <SubscribeButton user={user} channel={channel} setChannel={setChannel}/>
                    :
                    <Button onClick={() => navigate("/signIn")}>Sign in to Sub</Button>
                }
            </User>
                <Buttons>
                    <RatingButtonWrapper>
                        <RatingButton
                            onClick={likeVideo}
                            changeColor={likeColor}
                        >
                            <ThumbUpAltOutlinedIcon/>
                            {video.like.length}
                        </RatingButton>
                        <RatingButton
                            onClick={dislikeVideo}
                            changeColor={dislikeColor}
                        >
                            <ThumbDownAltOutlinedIcon/>
                        </RatingButton>
                    </RatingButtonWrapper>
                    <Button>
                        <ShareIcon/>
                        Share
                    </Button>
                    <Button>
                        <SaveIcon/>
                        Save
                    </Button>
                </Buttons>
            </Wrapper>
            <Info>
                <div>
                    {video.views} Views • {date.toLocaleDateString('en-US', dateOptions)}
                    <br/>
                    {video.videoDescription}
                </div>
                <div style={{marginTop: '30px', color: '#3ea6ff'}}>
                    #{video.tags.join(' #')}
                </div>
            </Info>
        </Container>
    );
};

export default VideoDescription;