import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import {subscribeChannel} from "../redux/userSlice";
import {useDispatch} from "react-redux";

const subscribeColor = css`
    background-color: ${(props) => (props.changeColor? "transparent" : "#CD5C5CFF")};
    border: solid 1px #CD5C5CFF;
  :hover {
    background-color: ${(props) => (props.changeColor? "#CD5C5CFF" : "#b44141")};
    border: solid 1px #b44141;
  }
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 20px;
  background-color: ${({theme}) => theme.colorHighlight};
  ${subscribeColor};
`;

const SubscribeButton = ({user, channel, setChannel}) => {
    const [subColor, setSubColor] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setSubColor(user.subscribedUsers.includes(channel._id))
    })

    const subscribe = async () => {
        if (user) {
            await axios.put(`http://localhost:8080/users/sub/${channel._id}`, {}, {withCredentials: true})
                       .then(res => {
                           dispatch(subscribeChannel(res.data.subscribedUsers))
                       });
            setChannel({...channel, subscribers: channel.subscribers +1} )
            setSubColor(true);
        }
    }

    const unSubscribe = async () => {
        if (user) {
            await axios.put(`http://localhost:8080/users/unsub/${channel._id}`, {}, {withCredentials: true})
                       .then(res => dispatch(subscribeChannel(res.data.subscribedUsers)));
            setChannel({...channel, subscribers: channel.subscribers -1} )
            setSubColor(false);
        }
    }

    return (
        !user.subscribedUsers.includes(channel._id) ?
            <Button subscribeButton
                    onClick={subscribe}
                    changeColor={subColor}
            >
                Subscribe
            </Button>
            :
            <Button subscribeButton
                    onClick={unSubscribe}
                    changeColor={subColor}
            >
                Unsubscribe
            </Button>
    )
}

export default SubscribeButton;