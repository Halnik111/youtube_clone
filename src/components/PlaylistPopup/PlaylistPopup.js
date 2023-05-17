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

const Banner = styled.div`
  font-weight: 400;
  font-size: 20px;
  padding-bottom: 5px;
    border-bottom: 1px solid ${({theme}) => theme.bgOpposite};
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

const PlaylistPopup = ({setOpenPopup, video}) => {
    const {user} =  useSelector(state => state.reducer.user);
    const {playlists} =  useSelector(state => state.reducer.playlists);
    const popupRef = useRef();
    const dispatch = useDispatch();


    useEffect(() => {
        console.log(video)
        if (user) {
            loadUserPlaylists();
        }

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
        await axios.get(`/api/playlists/${user._id}`)
                   .then(res =>  dispatch(playlistsFetchSuccess(res.data)))
                   .catch(console.log);
    };

    return (
        <Popup ref={popupRef}>
            <Banner>Save to Playlist:</Banner>
            {user && playlists ?
                playlists.map(playlist => <PlaylistPopupCheckbox key={playlist._id} playlist={playlist} video={video}/>)
                :
                <Link to={"/signIn"} style={{textDecoration: "none", color:"inherit"}}>
                    <Button>Login to save videos</Button>
                </Link>
            }
        </Popup>
    );
};

export default PlaylistPopup;