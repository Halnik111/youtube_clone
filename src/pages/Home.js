import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import Menu from "../components/Menu";

const Container = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin-right: 55px;
  margin-left: 295px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: 1fr;
  
  @media screen and (min-width: 1380px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const ContentWrapper =  styled.div`
  width: 100%;
  margin-top: 80px;
`;


const Home = ({type, darkMode, setDarkMode}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, [type])

    const fetchVideos = async () => {
        return await fetch(`http://localhost:8080/videos/${type}`)
            .then(res => res.json())
            .then(data => setVideos(data));
    }
    return (
        <ContentWrapper>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
            <Container>
                {
                    videos.map(video => <Card key={video._id} video={video}/>)
                }
            </Container>
        </ContentWrapper>

    );
};

export default Home;