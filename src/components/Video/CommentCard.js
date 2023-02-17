import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import axios from "axios";
import {format} from "timeago.js";

const blueColor = css`
  color: ${(props) => (props.changeColor? "#3ea6ff" : "inherit")}
`;

const Container = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0;
  gap: 20px;
`;

const GroupingDiv = styled.div`
    white-space: pre-wrap;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding-bottom: 5px;
`;

const RatingButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 15px;
  gap: 4px;
  padding: 5px;

  ${blueColor};
  
  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const DateAdded = styled.div`
  font-weight: 400;
  font-size: 13px;
  color: ${({theme}) => theme.textSoft};
`;

const ChannelName = styled.div`
  font-weight: 600;
  font-size: 13px;
`;

const CommentCard = ({currentComment, user}) => {
    const [comment, setComment] = useState(currentComment);
    const [channel, setChannel] = useState({});
    const [likeColor, setLikeColor] = useState(false);
    const [dislikeColor, setDisLikeColor] = useState(false);

    useEffect(() => {
        if (user) {
            setLikeColor(comment.likes.includes(user._id))
            setDisLikeColor(comment.dislikes.includes(user._id))
        }

        fetchChannel()
    }, [comment])

    const fetchChannel = async () => {
        await axios.get(`http://localhost:8080/users/find/${comment.userId}`)
            .then(res => setChannel(res.data))
    };

    const likeComment = async () => {
        await axios.put(`http://localhost:8080/comments/like/${comment._id}`, {}, {withCredentials: true})
            .then(res => setComment(res.data))
    }

    const dislikeComment = async () => {
        await axios.put(`http://localhost:8080/comments/dislike/${comment._id}`, {}, {withCredentials: true})
                   .then(res => setComment(res.data))
    }


    return (
        <Container>
            <ChannelImage src={channel.image}/>
            <GroupingDiv>
                <CommentWrapper>
                    <ChannelName>
                        {channel.name}
                    </ChannelName>
                    <DateAdded>
                        {format(comment.createdAt)}
                    </DateAdded>
                </CommentWrapper>
                {comment.description}
                <GroupingDiv style={{display: "flex", gap: "5px", paddingTop: "10px"}}>
                    <RatingButton
                        onClick={likeComment}
                        changeColor={likeColor}>
                        <ThumbUpAltOutlinedIcon/>
                        {comment.likes.length}
                    </RatingButton>
                    <RatingButton
                        onClick={dislikeComment}
                        changeColor={dislikeColor}>
                        <ThumbDownAltOutlinedIcon/>
                    </RatingButton>
                    <RatingButton>
                        reply
                    </RatingButton>
                </GroupingDiv>
            </GroupingDiv>
        </Container>
    );
};

export default CommentCard;