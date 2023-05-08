import RecommendationsCard from "./RecommendationsCard";
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const VideoRecommendations = () => {
    const [videos, setVideos] = useState([]);

    useEffect( () => {
        fetchVideos()
    }, [])

    const fetchVideos = async () => {
        return await axios.get(`/videos/explore`, {withCredentials: true})
                          .then(res => setVideos(res.data))
                          .catch(console.error);
    };


    const displayVideos = () => {
        return videos.map(video => <RecommendationsCard key={video._id} video={video}/> )
    }

    return (
        <Container>
            {displayVideos()}
        </Container>
    )
};

export default VideoRecommendations;