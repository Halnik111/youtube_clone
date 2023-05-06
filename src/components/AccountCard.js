import React, {useEffect, useState} from 'react';
import SubscribeButton from "./SubscribeButton";
import styled from "styled-components";
import axios from "axios";
import {useSelector} from "react-redux";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 135px;
  margin: 15px 25px;
`;

const ChannelImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 5px;
`;

const ChannelName = styled.h2`
    font-size: 20px;
  margin: 0;
`;

const ChannelSubscribers = styled.h3`
  color: ${({theme}) => theme.textSoft};
  font-size: 12px;
  margin: 0 0 10px 0;
`;


const AccountCard = ({channelId}) => {
    const [channel, setChannel] = useState({});
    const {user} = useSelector(state => state.reducer.user);

    useEffect(() => {
        fetchChannel();
    }, []);

    const fetchChannel = async () => {
        await axios.get(`http://localhost:8080/users/find/${channelId}`)
            .then(res => setChannel(res.data));
    }

    const subscribeButton = () => {
        if (user) {
            return (
                <SubscribeButton user={user} channel={channel} setChannel={setChannel}/>
            )
        }
    }

    return (
        <CardWrapper>
            <ChannelImage src={channel.image}/>
            <ChannelName>{channel.name}</ChannelName>
            <ChannelSubscribers>{channel.subscribers} Subscribers</ChannelSubscribers>
            {subscribeButton()}
        </CardWrapper>
    );
};

export default AccountCard;