import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import CommentCard from "./CommentCard";
import axios from "axios";

const Container = styled.div`
`;

const CommentBar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const NewComment = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: aliceblue;
`;

const Input = styled.textarea`
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

const Buttons = styled.div`
  margin-top: 5px;
  display: flex;
  gap: 20px;
  height: 36px;
  margin-left: auto;
`;

const Button = styled.div`
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

const VideoComments = ({video, user}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [row, setRow] = useState(1);

    useEffect(() => {
        fetchComments()
    }, [video]);

    const fetchComments = async () => {
        await axios.get(`http://localhost:8080/comments/${video._id}`)
            .then(res => setComments(res.data));
    };

    const addComment = async () => {
        if (newComment.length >= 1) {
            await axios.post("http://localhost:8080/comments/", {
                userId: user._id,
                videoID: video._id,
                description: newComment,
            }, {withCredentials: true})
                .then(() => {
                    reset();
                    fetchComments()
                })
        }
    };

    const reset = () => {
        setNewComment("");
        document.getElementById("input").value = "";
        setRow(1)
    };

    const addLine = (e) => {
        if (e.key === "Enter")
            setRow(row +1)
    }

    return (
        <Container>
            {user ?
                <CommentBar>
                    <ChannelImage src={user.image}/>
                    <NewComment>
                        <Input id={"input"} onKeyDown={addLine} rows={row} placeholder={" Add a comment.."}
                               onChange={e => setNewComment(e.target.value)}>
                        </Input>
                        <Buttons>
                            <Button onClick={reset}>
                                Cancel
                            </Button>
                            <Button onClick={addComment}>
                                Comment
                            </Button>
                        </Buttons>
                    </NewComment>
                </CommentBar>
                :
                <Button style={{backgroundColor: "#CD5C5CFF"}}>Sign in to comment</Button>
            }
            {comments.map(comment => <CommentCard key={comment._id} currentComment={comment} user={user} fetchComments={fetchComments}/>)}

        </Container>
    );
};

export default VideoComments;