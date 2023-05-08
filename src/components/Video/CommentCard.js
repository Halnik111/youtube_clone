import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import React, {useEffect, useRef, useState} from "react";
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

const DropdownContainer = styled.div`
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

const DropdownWrapper = styled.div`
    padding: 25px;
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
  };
  
  :nth-child(4) {
    background-color: ${({theme}) => theme.colorHighlight};
    padding: 0 10px;
    
    :hover {
      background-color: ${({theme}) => theme.colorFocus};
    }
  }
`;

const Button = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 5px;
  
  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  };
  
  :nth-child(1) {
    background-color: ${({theme}) => theme.colorHighlight};
    padding: 0 10px;
    margin-right: 5px;
    
    :hover {
      background-color: ${({theme}) => theme.colorFocus};
    }
  }
  
  :nth-child(2) {
    background-color: indianred;

    :hover {
      background-color: firebrick;
    }
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

const TextArea = styled.textarea`
  resize: none;
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  padding: 5px;
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

const PopupButtons = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 20px;
  height: 36px;
  margin-left: auto;
`;

const PopupButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({theme}) => theme.colorHighlight};

  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
`;

const RedButton = styled(PopupButton)`
    background-color: indianred;
  
  :hover {
    background-color: firebrick;
  }
`;


const CommentCard = ({currentComment, user, fetchComments}) => {
    const [comment, setComment] = useState(currentComment);
    const [channel, setChannel] = useState({});
    const [likeColor, setLikeColor] = useState(false);
    const [dislikeColor, setDisLikeColor] = useState(false);
    const [openEditDropdown, setOpenEditDropdown] = useState(false);
    const [openDeleteDropdown, setOpenDeleteDropdown] = useState(false);
    const [newContent, setNewContent] = useState("");
    const [row, setRow] = useState(1);
    let dropdownRef = useRef();


    useEffect(() => {
        if (user) {
            setLikeColor(comment.likes.includes(user._id))
            setDisLikeColor(comment.dislikes.includes(user._id))
        }

        fetchChannel()

        let handler = (e) => {
            try {
                if (!dropdownRef.current.contains(e.target)) {
                    setOpenEditDropdown(false);
                    setOpenDeleteDropdown(false);
                    reset();
                }
            } catch (err) {
            }
        }
        document.addEventListener("mousedown", handler);
    }, [comment])

    const fetchChannel = async () => {
        await axios.get(`/users/find/${comment.userId}`)
            .then(res => setChannel(res.data))
    };

    const likeComment = async () => {
        if (user) {
            await axios.put(`/comments/like/${comment._id}`, {}, {withCredentials: true})
                       .then(res => setComment(res.data))
        }
    }

    const dislikeComment = async () => {
        if (user) {
            await axios.put(`/comments/dislike/${comment._id}`, {}, {withCredentials: true})
                       .then(res => setComment(res.data))
        }
    }

    const editComment = async () => {
        await axios.put(`/comments/${comment._id}`, {description: newContent}, {withCredentials: true})
                   .then(res =>  setComment(res.data))
    }

    const deleteComment = async () => {
        await axios.delete(`/comments/${comment._id}`, {withCredentials: true})
            .then(fetchComments)
    }

    const reset = () => {
        setNewContent("");
        document.getElementById("editInput").value = "";
        setRow(1)
    };

    const dropdown = () => {

        const addLine = (e) => {
            if (e.key === "Enter")
                setRow(row +1)
        }

        if (openEditDropdown) {
            return (
                <DropdownContainer>
                    <DropdownWrapper ref={dropdownRef}>
                        <TextArea id="editInput" onKeyDown={addLine} rows={row} placeholder={"Edit comment.."} onChange={e => setNewContent(e.target.value)}/>
                        <PopupButtons>
                            <PopupButton onClick={() => {
                                reset();
                                setOpenEditDropdown(false)
                            }}>
                                Cancel
                            </PopupButton>
                            <RedButton onClick={() => {
                                editComment();
                                setOpenEditDropdown(false)
                            }}>
                                Comment
                            </RedButton>
                        </PopupButtons>
                    </DropdownWrapper>
                </DropdownContainer>
            )
        }
        else if (openDeleteDropdown) {
            return (
                <DropdownContainer style={{width: "auto"}}>
                    <DropdownWrapper ref={dropdownRef}>
                        Are you sure?
                        <PopupButtons>
                            <PopupButton onClick={() => setOpenDeleteDropdown(false)}>
                                Cancel
                            </PopupButton>
                            <RedButton onClick={() => {
                                deleteComment();
                                setOpenDeleteDropdown(false)
                            }}>
                                Delete
                            </RedButton>
                        </PopupButtons>
                    </DropdownWrapper>
                </DropdownContainer>
            )
        }
    }

    const commentOptions = () => {
        if (user) {
            if (comment.userId === user._id) {
                return (
                    <div style={{display: "flex"}}>
                        <Button onClick={() => setOpenEditDropdown(!openEditDropdown)}>edit</Button>
                        <Button onClick={() => setOpenDeleteDropdown(!openDeleteDropdown)}><DeleteOutlinedIcon/></Button>
                        {dropdown()}
                    </div>
                )
            }
        }
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
                    {commentOptions()}
                </GroupingDiv>
            </GroupingDiv>
        </Container>
    );
};

export default CommentCard;