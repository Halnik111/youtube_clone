import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import axios from "axios";
import {format} from "timeago.js";

const Container = styled.div`
  display: flex;
  width: 400px;
  cursor: pointer;
`;

const Image = styled.img`
    width: 168px;
  height: 94px;
  border-radius: 8px;
  margin: 4px 6px;
`;

const Details = styled.div`
  color: ${({theme}) => theme.text};
  margin-right: 15px;
`;

const Channel = styled.h2`
  font-size: 12px;
  margin-bottom: 3px;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 500;
`;

const Info = styled.div`
  font-size: 12px;
`

const RecommendationsCard = ({video, playlist}) => {
    const [channel, setChannel] = useState({});

    useEffect( () => {
        fetchChannel();
    }, [video.userId]);

    const fetchChannel = async () => {
        await axios.get(`http://localhost:8080/users/find/${video.userId}`)
            .then(res => setChannel(res.data))
            .catch(console.log);
    }

    return (
        <Link to={{pathname: `/video/${video._id}`}} state={playlist} style={{textDecoration:"none"}}>
        <Container>
                <Image src={video.imageUrl} />
                <Details>
                    <Title>{video.videoTitle}</Title>
                    <Channel>{channel.name}</Channel>
                    <Info>{video.views} views • {format(video.createdAt)}</Info>
                </Details>
        </Container>
        </Link>
    );
};

export default RecommendationsCard;