import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import Menu from "../components/Menu";
import axios from "axios";

const Container = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin-right: 55px;
  margin-left: 295px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: 1fr;
  
  @media screen and (min-width: 1630px) {
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
        return await axios.get(`http://localhost:8080/videos/${type}`, {withCredentials: true})
            .then(res => setVideos(res.data))
            .catch(console.error);
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