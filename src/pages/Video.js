import React, {useEffect} from 'react';
import styled from "styled-components";
import VideoComments from "../components/Video/VideoComments";
import VideoDescription from "../components/Video/VideoDescription";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {fetchFail, fetchStart, fetchSuccess} from "../redux/videoSlice";
import VideoRecommendations from "../components/Video/VideoRecommendations";

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

const Video = () => {
    const { user } = useSelector(state => state.reducer.user);
    const { video } = useSelector(state => state.reducer.video);
    const dispatch = useDispatch();
    const path = useLocation().pathname.split("/")[2];

    useEffect(  () => {
        dispatch(fetchStart)
        const fetchVideo = async () => {
            await axios.get(`http://localhost:8080/videos/find/${path}`, {withCredentials: true})
                       .then(res => dispatch(fetchSuccess(res.data)))
                       .catch(err => dispatch(fetchFail(err)));
        }
        fetchVideo();
    }, [dispatch, path]);

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <IFrame
                        src={video.videoUrl}
                    >
                    </IFrame>
                </VideoWrapper>
                <div></div>
                <VideoDescription video={video} user={user}/>
                <VideoComments/>
            </Content>
            <VideoRecommendations/>
        </Container>
    );
};

export default Video;