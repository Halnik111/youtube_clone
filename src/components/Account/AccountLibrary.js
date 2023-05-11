import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import PlaylistCard from "../PlaylistCard";
import {playlistsFetchSuccess} from "../../redux/playlistsSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Popup= styled.div`
  background-color: ${({theme}) => theme.softColor};
  width: 400px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -125px;
  margin-left: -200px;
  border-radius: 15px;
`;

const PopupWrapper = styled.div`
    margin: 15px;
`;

const PlaylistButtons = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  gap: 25px;
  border-bottom: 2px solid ${({theme}) => theme.softColor};
  padding: 10px 30px;
`;

const Button = styled.div`
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 500;
  background-color: #CD5C5CFF;
  
  :hover {
    background-color: #b44141;
  }
  
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 25px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 400;
  color: ${({theme}) => theme.text};
  border-bottom: 2px solid ${({theme}) => theme.bgOpposite};

  ::placeholder {
    font-size: 15px;
    font-weight: 400;
    color: ${({theme}) => theme.textSoft};
  }
`;


const AccountLibrary = ({channel}) => {
    const {playlists} =  useSelector(state => state.reducer.playlists);
    const [openPopup, setOpenPopup] = useState(false);
    const {user} = useSelector(state => state.reducer.user);
    let popupRef = useRef();
    const dispatch = useDispatch();
    const [playlistName, setPlaylistName] = useState('');

    useEffect(() => {
        fetchPlaylists();

        let handler = (e) => {
            try {
                if (!popupRef.current.contains(e.target)) {
                    setOpenPopup(false);
                }
            } catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    },[channel]);

    const fetchPlaylists = async () => {
        return await axios.get(`/api/playlists/${channel._id}`)
            .then(res =>  dispatch(playlistsFetchSuccess(res.data)))
                   .catch(console.log);

    }

    const createPlaylist = async () => {
        return axios.post(`/api/playlists/`, {name: playlistName}, {withCredentials: true})
            .then(res => dispatch(playlistsFetchSuccess([...playlists, res.data])));
    }

    const displayPlaylists = () => {
        if (playlists.length === 0) {
            return <div>No playlists found</div>
        }
        else  {
            return playlists.map(playlist => <PlaylistCard key={playlist._id} playlist={playlist}/>);
        }
    }

    const popup = () => {
        if (openPopup) {
            return (
                <Popup ref={popupRef}>
                    <PopupWrapper>
                        <TextArea placeholder={"Playlist name.."} onChange={e => setPlaylistName(e.target.value)}>
                        </TextArea>
                        <Button onClick={() => createPlaylist().then(() => setOpenPopup(false))}>Create Playlist</Button>
                    </PopupWrapper>
                </Popup>
            )
        }
    }

    return (
        <Container>
            {user?._id === channel._id ?
                <div>
                    <PlaylistButtons>
                        <Button onClick={() => setOpenPopup(true)}>Create new playlist</Button>
                    </PlaylistButtons>
                    {popup()}

                    {
                        displayPlaylists()
                    }
                </div>
                :
                <div>
                    {
                        displayPlaylists()
                    }
                </div>
            }
        </Container>
    );
};

export default AccountLibrary;