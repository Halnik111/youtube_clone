import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import Thumbnail from "../img/test pic.jpg";

const Container = styled.div`
  margin: 20px auto;
  max-width: 360px;
  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 12px;
  max-width: 100%;
  height: auto;
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

const Card = () => {
    return (
            <Container>
                <Link to={"/video/test"} style={{textDecoration:"none"}}>
                <Image src={Thumbnail} />
                <Details>
                    <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                    <Video_description>
                        <Title>Test Video</Title>
                        <Channel>Channel Name</Channel>
                        <Info>600,000 views 1 day ago</Info>
                    </Video_description>
                </Details>
                </Link>
            </Container>

    );
};

export default Card;