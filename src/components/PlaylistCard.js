import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import Card from "./Card";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {useSelector} from "react-redux";

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
  border-top: 2px solid ${({theme}) => theme.softColor};
`;

const PopupWrapper = styled.div`
  margin-left: 5px;
    display: flex;
  gap: 5px;
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

const DeleteButton = styled(Button)`
    background-color: indianred;
  :hover {
    background-color: #b44141;
  }
`;

const PopupButton= styled(Button)`
    height: 16px;
  font-size: 14px;
  font-weight: 400;
  background-color: indianred;

  :nth-child(1):hover {
    background-color: ${({theme}) => theme.softColor};
  }
  
  :nth-child(2):hover {
    background-color: firebrick;
  }
`;

const PlaylistCard = ({playlist, setPlaylists}) => {
    const [videos, setVideos] = useState([]);
    const [openDeleteDropdown, setOpenDeleteDropdown] = useState(false);
    const {user} = useSelector(state =>  state.reducer.user);
    const popupRef = useRef();


    useEffect(() => {
        fetchPlaylistVideos();

        let handler = (e) => {
            try {
                if (!popupRef.current.contains(e.target)) {
                    setOpenDeleteDropdown(false);
                }
            }
            catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    }, [playlist]);

    const fetchPlaylistVideos = async () => {
        await axios.get(`http://localhost:8080/playlists/preview/${playlist._id}`)
            .then(res => setVideos(res.data));
    }

    const deletePlaylist = async () => {
        await axios.delete(`http://localhost:8080/playlists/${playlist._id}`, {withCredentials: true})
                   .then(res => setPlaylists(res.data));
    }

    const displayVideos = () => {
        if (videos.length === 0) {
            return <div style={{margin: "35px"}}>Empty playlist</div>

        }
        else {
            return (
                videos.map(video => <Card key={video._id} video={video} playlist={playlist} fetchVideos={fetchPlaylistVideos}/>)
            )
        }
    };
    
    const popup = () => {
        if (openDeleteDropdown) {
            return (
                <PopupWrapper ref={popupRef}>
                    <PopupButton>Cancel</PopupButton>
                    <PopupButton onClick={() =>  deletePlaylist()}>Delete</PopupButton>
                </PopupWrapper>
            );
        }
    }

    return (
        <Container>
            {user._id === playlist.userId ?
                <PlaylistBanner>
                    {playlist.name}
                    <Button>View All ►</Button>
                    <DeleteButton onClick={() => setOpenDeleteDropdown(!openDeleteDropdown)}><DeleteOutlinedIcon/>
                        {popup()}
                    </DeleteButton>
                </PlaylistBanner>
                :
                <PlaylistBanner>
                    {playlist.name}
                    <Button>View All ►</Button>
                </PlaylistBanner>
            }

            <Content>
                {displayVideos()}
            </Content>
        </Container>
    );
};

export default PlaylistCard;