import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";

const Container = styled.div`
    width: 100%;
`;

const Content = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin: 0 55px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: 1fr;

  @media screen and (min-width: 1650px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const PlaylistBanner = styled.div`
  box-sizing: border-box;
  display: flex;
  gap: 30px;
  width: 100%;
  font-size: 22px;
  padding: 15px 30px;
  border-bottom: 2px solid ${({theme}) => theme.softColor};
  border-top: 2px solid ${({theme}) => theme.softColor};
`;

const Button = styled.div`
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 15px;
  font-size: 16px;
  font-weight: 500;
  background-color: ${({theme}) => theme.softColor};

  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }

`;

const PlaylistCard = ({playlist}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchPlaylistVideos();
    });

    const fetchPlaylistVideos = async () => {
        await axios.get(`http://localhost:8080/playlists/preview/${playlist._id}`)
            .then(res => setVideos(res.data));
    }

    const displayVideos = () => {
        if (videos.length === 0) {
            return <div>Empty playlist</div>
        }
        else {
            return (
                videos.map(video => <Card key={video._id} video={video}/>)
            )
        }
    }

    return (
        <Container>
            <PlaylistBanner>
                {playlist.name}
                <Button>View All ►</Button>
            </PlaylistBanner>
            <Content>
                {displayVideos()}
            </Content>
        </Container>
    );
};

export default PlaylistCard;