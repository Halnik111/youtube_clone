import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {format} from "timeago.js";
import ThreeDot from '@mui/icons-material/MoreVertOutlined';
import PlaylistPopup from "./PlaylistPopup/PlaylistPopup";

const Container = styled.div`
  margin: 20px auto;
  max-width: 360px;
`;

const Image = styled.img`
  border-radius: 12px;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  cursor: pointer;

`;

const Details = styled.div`
  display: flex;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: aliceblue;
  cursor: pointer;

`;

const Video_description = styled.div`
  color: ${({theme}) => theme.textSoft};
`;

const Channel = styled.h2`
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 0;
  font-weight: 400;
  cursor: pointer;
  
  :hover {
    color: ${({theme}) => theme.text};
  }
`;

const Title = styled.h1`
  font-size: 16px;
  color: ${({theme}) => theme.text};
  font-weight: 500;
`;

const Info = styled.div`
  font-size: 14px;
`;

const Wrapper = styled.div`
    width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const ThreeDotWrapper = styled.div`
  display: flex;
  width: 35px;
  height: 35px;
  justify-content: center;
  position: relative;
  align-items: center;
  cursor: pointer;
  background-color: ${({theme}) => theme.softColor};
  border-radius: 17px;
  color: ${({theme}) => theme.text};
  
  :hover {
    background-color: ${({theme}) => theme.colorHighlight};
  }
`;

const Card = ({video, playlist}) => {
    const [channel, setChannel] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const popupRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        fetchChannel();

        let handler = (e) => {
            try {
                if (!popupRef.current.contains(e.target)) {
                    setOpenPopup(false);
                }
            }
            catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    }, [video.userId]);

    const fetchChannel = async () => {
        return await fetch(`http://localhost:8080/users/find/${video.userId}`)
            .then(res => res.json())
            .then(data => setChannel(data))
    };


    const popup = () => {
        if (openPopup) {
            return (
                <PlaylistPopup setOpenPopup={setOpenPopup} video={video}/>
            )
        }
    }

    return (
            <Container>
                <Link to={{pathname: `/video/${video._id}`}} state={playlist} style={{textDecoration:"none"}}>
                <Image src={video.imageUrl}/>
                </Link>
                <Wrapper>
                        <Details>
                            <ChannelImage src={channel.image} />
                            <Video_description>
                                <Title>{video.videoTitle}</Title>
                                <div style={{display: "flex"}}>
                                    <Channel onClick={() => navigate(`/account/${video.userId}`, {state: 1})}>{channel.name}</Channel>
                                </div>
                                <Info>{video.views} views • {format(video.createdAt)}</Info>
                            </Video_description>
                        </Details>
                        <ThreeDotWrapper onClick={() => setOpenPopup(true)}>
                            <ThreeDot />
                            {popup()}
                        </ThreeDotWrapper>
                    </Wrapper>
            </Container>
    );
};

export default Card;