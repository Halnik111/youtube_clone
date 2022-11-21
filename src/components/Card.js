import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
  width: 360px;
  margin-bottom: 45px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 202px;
  border-radius: 12px;
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
        <Link to={"/video/test"} style={{textDecoration:"none"}}>
            <Container>
                <Image src={"https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w="} />
                <Details>
                    <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                    <Video_description>
                        <Title>Test Video</Title>
                        <Channel>Channel Name</Channel>
                        <Info>600,000 views 1 day ago</Info>
                    </Video_description>
                </Details>
            </Container>
        </Link>
    );
};

export default Card;