import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import Thumbnail from "../../img/test pic.jpg";

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

const RecommendationsCard = () => {
    return (
        <Link to={"/video/test"} style={{textDecoration:"none"}}>
        <Container>
                <Image src={Thumbnail} />
                <Details>
                    <Title>Test Video</Title>
                    <Channel>Channel Name</Channel>
                    <Info>600,000 views 1 day ago</Info>
                </Details>
        </Container>
        </Link>
    );
};

export default RecommendationsCard;