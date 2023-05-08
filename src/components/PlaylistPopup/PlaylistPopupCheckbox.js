import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import {updatePlaylist} from "../../redux/playlistsSlice";

const Container = styled.div`
    display: flex;
  width: 100%;
  padding: 2px;
  font-size: 18px;
  align-items: center;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  color: black;
`;


const PlaylistPopupCheckbox = ({playlist, video}) => {
    const [isAdded, setIsAdded] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        setIsAdded(!!playlist.videos.includes(video._id));
    },[playlist]);

    const handler = async (e) => {
            if (e.target.checked) {
                await axios.put(`/playlists/add/${playlist._id}`,{video:video._id}, {withCredentials: true})
                           .then(res => dispatch(updatePlaylist(res.data)))
                           .catch(console.log);
            }
            else {
                await axios.put(`/playlists/remove/${playlist._id}`,{video:video._id}, {withCredentials: true})
                           .then(res => dispatch(updatePlaylist(res.data)))
                           .catch(console.log);
            }
    }

    return (
        <Container>
            <Checkbox type={"checkbox"} checked={isAdded} onChange={(e) => handler(e)}/>
            {playlist.name}
        </Container>
    );
};

export default PlaylistPopupCheckbox;