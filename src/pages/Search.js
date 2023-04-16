import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useLocation} from "react-router-dom";
import Card from "../components/Card";

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

const Search = () => {
    const [videos, setVideos] = useState([]);
    const searchInput = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
            await axios.get(`http://localhost:8080/videos/search${searchInput}`, {withCredentials: true})
                .then(res => setVideos(res.data));
        }
        fetchVideos();
    }, [searchInput])

    return (
        <ContentWrapper>
            <Container>
                {videos.map(video => <Card key={video._id} video={video}/>)}
            </Container>
        </ContentWrapper>
    );
};

export default Search;