import React, {useEffect, useRef} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {playlistsFetchSuccess} from "../../redux/playlistsSlice";
import PlaylistPopupCheckbox from "./PlaylistPopupCheckbox";

const Popup = styled.div`
  background-color: ${({theme}) => theme.softColor};
  position: absolute;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  bottom: 40px;
  right: 0;
`;

const PlaylistPopup = ({setOpenPopup}) => {
    const {user} =  useSelector(state => state.reducer.user);
    const {playlists} =  useSelector(state => state.reducer.playlists);
    const popupRef = useRef();
    const dispatch = useDispatch();


    useEffect(() => {
        loadUserPlaylists();
        let handler = (e) => {
            try {
                if (!popupRef.current.contains(e.target)) {
                    setOpenPopup(false);
                }
            }
            catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    },[user]);

    const loadUserPlaylists = async () => {
        await axios.get(`http://localhost:8080/playlists/${user._id}`)
                   .then(res =>  dispatch(playlistsFetchSuccess(res.data)))
                   .catch(console.log);
    }

    return (
        <Popup ref={popupRef}>
            {user ?
                playlists.map(playlist => <PlaylistPopupCheckbox key={playlist._id} playlist={playlist}/>)
                :
                <Link to={"/signIn"} style={{textDecoration: "none", color:"inherit"}}>
                    <Button>Login to save videos</Button>
                </Link>
            }
        </Popup>
    );
};

export default PlaylistPopup;