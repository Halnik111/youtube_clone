import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {format} from "timeago.js";

const Container = styled.div`
  margin: 20px auto;
  max-width: 360px;
  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 12px;
  max-width: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const Video_description = styled.div`
  color: ${({theme}) => theme.text};
`;

const Channel = styled.h2`
  font-size: 14px;
  margin: 9px 0;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const Info = styled.div`
  font-size: 14px;
`

const Card = ({video}) => {
    const [channel, setChannel] = useState({});


    useEffect(() => {
        fetchChannel();
    }, [video.userId]);

    const fetchChannel = async () => {
        return await fetch(`http://localhost:8080/users/find/${video.userId}`)
            .then(res => res.json())
            .then(data => setChannel(data))
    }
    return (
            <Container>
                <Link to={"/video/test"} style={{textDecoration:"none"}}>
                <Image src={video.imageUrl}/>
                <Details>
                    <ChannelImage src={channel.image}/>
                    <Video_description>
                        <Title>{video.videoTitle}</Title>
                        <Channel>{channel.name}</Channel>
                        <Info>{video.views} views • {format(video.createdAt)}</Info>
                    </Video_description>
                </Details>
                </Link>
            </Container>

    );
};

export default Card;