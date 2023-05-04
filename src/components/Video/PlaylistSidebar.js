import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import RecommendationsCard from "./RecommendationsCard";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 24px;
`;

const Wrapper = styled.div`
    width: 100%;
  border: 1px solid ${({theme}) => theme.colorHighlight};
  background-color: ${({theme}) => theme.softColor};
  border-radius: 10px;
`;

const PlaylistBanner = styled.div`
  padding: 20px 15px;
    font-size: 20px;
  font-weight: bold;
`;

const PlaylistSidebar = ({playlist}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchPlaylistVideos();
    }, [playlist]);

    const fetchPlaylistVideos = async () => {
        await axios.get(`http://localhost:8080/playlists/preview/${playlist._id}`)
                   .then(res => setVideos(res.data));
    }

    const displayVideos = () => {
        return videos.map(video => <RecommendationsCard key={video._id} video={video} playlist={playlist}/> )
    }

    return (
        <Container>
            <Wrapper>
                <PlaylistBanner>{playlist.name}</PlaylistBanner>
                {displayVideos()}
            </Wrapper>
        </Container>
    )
};

export default PlaylistSidebar;