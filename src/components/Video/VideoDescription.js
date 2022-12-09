import React from 'react';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ShareIcon from '@mui/icons-material/ReplyOutlined';
import SaveIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import styled from "styled-components";

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
  
  :nth-child(4) {
    margin-right: 20px;
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
  
  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
  
  :nth-child(1) {
    border-right: 1px solid ${({theme}) => theme.softColor};
    border-radius: 20px 0 0 20px;
    padding-left: 10px;
    gap: 10px;
  }
  
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
  height: 80px;
  border-radius: 10px;
`;

const VideoDescription = () => {
    return (
        <Container>
            <Title>
                Test Video with longer title so it doesnt look too empty
            </Title>
            <Wrapper>
            <User>
                <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                <UserDetails>
                    <Username>
                        Test User
                    </Username>
                    <Subscribers>
                        160,000 Subscribers
                    </Subscribers>
                </UserDetails>
                <Button>
                    Join
                </Button>
                <Button>
                    Subscribe
                </Button>
            </User>
                <Buttons>
                    <RatingButtonWrapper>
                        <RatingButton>
                            <ThumbUpAltOutlinedIcon/>
                            1.2K
                        </RatingButton>
                        <RatingButton>
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
                7,950,150 views May 22, 2022
                <br/>
                asd
            </Info>
        </Container>
    );
};

export default VideoDescription;