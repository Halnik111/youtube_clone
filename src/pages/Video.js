import React from 'react';
import styled from "styled-components";
import RecommendationsCard from "../components/Video/RecommendationsCard";
import VideoComments from "../components/Video/VideoComments";
import VideoDescription from "../components/Video/VideoDescription";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin: 85px auto;

  @media screen and (max-width: 1020px) {
    flex-wrap: wrap;
    justify-content: left;
  }
`;

const Content = styled.div`
    width: 100%;
  max-width: 1280px;
  margin:0 24px;
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
  z-index: 0;
`;

const Recommendations = styled.div`
    
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
                <VideoDescription/>
                <VideoComments/>
            </Content>
            <Recommendations>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
                <RecommendationsCard/>
            </Recommendations>
        </Container>
    );
};

export default Video;