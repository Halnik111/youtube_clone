import React, {useEffect, useState} from 'react';
import Card from "../Card";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
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

const AccountVideos = ({path}) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchVideos();
    },[path])

    const fetchVideos = async () => {
        await axios.get(`/api/videos/channel/${path}`, {withCredentials: true})
                   .then(res => {
                       setVideos(res.data);
                   })
                   .catch(console.log);
    }

    return (
        <Container>
            <Content>
                {videos?.map(video => <Card key={video._id} video={video}/>)}
            </Content>
        </Container>
    );
};

export default AccountVideos;
