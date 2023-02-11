import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import RecommendationsCard from "../components/Video/RecommendationsCard";
import VideoComments from "../components/Video/VideoComments";
import VideoDescription from "../components/Video/VideoDescription";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {fetchFail, fetchStart, fetchSuccess} from "../redux/videoSlice";

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
    const { user } = useSelector(state => state.reducer.user);
    const { video } = useSelector(state => state.reducer.video);
    const dispatch = useDispatch();
    const [channel, setChannel] = useState({});
    const path = useLocation().pathname.split("/")[2];

    useEffect(() => {
        dispatch(fetchStart())
        fetchVideo();
        fetchChannel();
        console.log(video)
        console.log(user)
        console.log(channel)
    }, [path, dispatch]);

    const fetchVideo = async () => {
        return await axios.get(`http://localhost:8080/videos/find/${path}`, {withCredentials: true})
                          .then(res => dispatch(fetchSuccess(res.data)))
                          .catch(err => dispatch(fetchFail(err)));
    }

    const fetchChannel = async () => {
        return await axios.get(`http://localhost:8080/users/find/${video.userId}`, {withCredentials: true})
                          .then(res => setChannel(res.data))
                          .catch(err => dispatch(fetchFail(err)));
    }

    return (
        <Container>
            <Content>
                <VideoWrapper>
                    <IFrame
                        src={video.videoUrl}
                    >
                    </IFrame>
                </VideoWrapper>
                <VideoDescription video={video} channel={channel} user={user}/>
                <VideoComments/>
            </Content>
            <Recommendations>
                <RecommendationsCard/>
            </Recommendations>
        </Container>
    );
};

export default Video;