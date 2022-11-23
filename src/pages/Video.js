import React from 'react';
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 85px auto;
  gap: 24px;
`;

const Content = styled.div`
    width: 100%;
  max-width: 1280px;
`;

const VideoWrapper = styled.div`
    overflow: hidden;
  padding-top: 56.25%;
  position: relative;
`;

const IFrame = styled.iframe`
    border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  ${({theme}) => theme.textSoft}
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  ${({theme}) => theme.textSoft}
`;

const Button = styled.div`
    
`;

const Recommendations = styled.div`
  width: 430px;
  background-color: red;
`;

const Video = () => {
    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <IFrame
                    src="https://youtube.com/embed/BvWtNx3VOUA"
                    >
                    </IFrame>
                </VideoWrapper>
                <Title>
                    Test Video
                </Title>
                <Details>
                    <Info>
                        7,950,150 views May 22, 2022
                    </Info>
                    <Buttons>
                        <Button>
                            <ThumbUpAltOutlinedIcon/>
                            120
                        </Button>
                        <Button>
                            <ThumbDownAltOutlinedIcon/>
                            Dislike
                        </Button>
                    </Buttons>
                </Details>
            </Content>
            <Recommendations>
                Recommendations
            </Recommendations>
        </Container>
    );
};

export default Video;