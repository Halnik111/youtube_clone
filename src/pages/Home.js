import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin: 0 55px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: 1fr;
  
  @media screen and (min-width: 1650px) {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
`;

const ContentWrapper =  styled.div`
  width: 100%;
  margin-top: 80px;
`;


const Home = ({type}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, [type])

    const fetchVideos = async () => {
            return await axios.get(`/api/videos/${type}`, {withCredentials: true})
                              .then(res => setVideos(res.data))
                              .catch(console.error);
    }

    const displayVideos = () => {
        if (videos.length === 0) {
            return <div>No subscribed channels</div>
        }
        else {
            return videos.map(video => <Card key={video._id} video={video}/>)
        }
    }

    return (
        <ContentWrapper>
            <Container>
                {
                    displayVideos()
                }
            </Container>
        </ContentWrapper>

    );
};

export default Home;