import React from 'react';
import styled from "styled-components";
import AccountCard from "../AccountCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;



const AccountChannels = ({channel}) => {
    const {subscribedUsers} = channel;

    return (
        <Container>
            {subscribedUsers.map(channelId => <AccountCard key={channelId} channelId={channelId}/>)}
        </Container>
    );
};

export default AccountChannels;