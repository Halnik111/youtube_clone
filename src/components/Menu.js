import React from "react";
import styled from "styled-components";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import TrendingOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SportOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ReportOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SendFeedBackOutlinedIcon from '@mui/icons-material/SmsFailedOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Container = styled.div`
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
  font-size: 14px;
  height: 100%;
  position: fixed;
  margin-top: 71px;
  top: 0;
`;

const Wrapper = styled.div`
  padding: 0 25px;
  width: 190px;
  max-height: calc(110vh - 9rem);
  overflow-y: scroll;
  
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({theme}) => theme.scrollbarColor};
    border-radius: 5px;
  }
`;

const Title = styled.div`
  color: ${({theme}) => theme.text};
  margin-bottom: 20px;
  font-size: large;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0;
`;

const Login = styled.div`
    
`;
const Button = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 10px 0;
  width: 80px;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.softColor};
  font-size: 16px;
  gap: 5px;
  color: #3ea6ff;
  border-radius: 50px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 1px solid ${({theme}) => theme.softColor};
`;


const Menu = ({darkMode, setDarkMode}) => {
    return (
        <Container>
            <Wrapper>
                <Item>
                    <HomeOutlinedIcon/>
                    Home
                </Item>
                <Item>
                    <SubscriptionsOutlinedIcon/>
                    Subscriptions
                </Item>
                <Hr/>
                <Item>
                    <VideoLibraryOutlinedIcon/>
                    Library
                </Item>
                <Item>
                    <HistoryOutlinedIcon/>
                    History
                </Item>
                <Hr/>
                <Login>
                    Sign in to like videos, comment, and subscribe.
                    <Button>
                        <AccountCircleOutlinedIcon/>
                        Sign in
                    </Button>
                </Login>
                <Hr/>
                <Title>
                    Explore
                </Title>
                <Item>
                    <TrendingOutlinedIcon/>
                    Trending
                </Item>
                <Item>
                    <MusicNoteOutlinedIcon/>
                    Music
                </Item>
                <Item>
                    <LocalMoviesOutlinedIcon/>
                    Movies
                </Item>
                <Item>
                    <SportsEsportsOutlinedIcon/>
                    Gaming
                </Item>
                <Item>
                    <SportOutlinedIcon/>
                    Sports
                </Item>
                <Hr/>
                <Item>
                    <SettingsOutlinedIcon/>
                    Settings
                </Item>
                <Item>
                    <ReportOutlinedIcon/>
                    Report history
                </Item>
                <Item>
                    <HelpOutlineOutlinedIcon/>
                    Help
                </Item>
                <Item>
                    <SendFeedBackOutlinedIcon/>
                    Send feedback
                </Item>
                <Hr/>
                <Item onClick={() =>setDarkMode(!darkMode)}>
                    <SettingsBrightnessOutlinedIcon/>
                    Light mode
                </Item>
            </Wrapper>
        </Container>

    )
}

export default Menu;