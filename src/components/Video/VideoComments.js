import React from 'react';
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const Container = styled.div`
`;

const GroupingDiv = styled.div`
`;

const CommentBar = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding-bottom: 5px;
`;

const Comment = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0;
  gap: 20px;
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

const Input = styled.input`
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

const RatingButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 15px;
  gap: 4px;
  padding: 5px;
  
  :hover {
    background-color: ${({theme}) => theme.colorFocus};
  }
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

const VideoComments = () => {
    return (
        <Container>
            <CommentBar>
                <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                <NewComment>
                    <Input placeholder={" Add a comment.."}>
                    </Input>
                    <Buttons>
                        <Button>
                            Cancel
                        </Button>
                        <Button>
                            Comment
                        </Button>
                    </Buttons>
                </NewComment>
            </CommentBar>

            <Comment>
                <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                <GroupingDiv>
                    <CommentWrapper>
                        <ChannelName>
                            Test User
                        </ChannelName>
                        <DateAdded>
                            3 days ago,
                        </DateAdded>
                    </CommentWrapper>
                    Comment
                    <GroupingDiv style={{display: "flex", gap: "5px", paddingTop: "10px"}}>
                        <RatingButton>
                            <ThumbUpAltOutlinedIcon/>
                            6
                        </RatingButton>
                        <RatingButton>
                            <ThumbDownAltOutlinedIcon/>
                        </RatingButton>
                        <RatingButton>
                            reply
                        </RatingButton>
                    </GroupingDiv>
                </GroupingDiv>
            </Comment>
            <Comment>
                <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                <GroupingDiv>
                    <CommentWrapper>
                        <ChannelName>
                            Test User
                        </ChannelName>
                        <DateAdded>
                            3 days ago,
                        </DateAdded>
                    </CommentWrapper>
                    Comment
                    <GroupingDiv style={{display: "flex", gap: "5px", paddingTop: "10px"}}>
                        <RatingButton>
                            <ThumbUpAltOutlinedIcon/>
                            6
                        </RatingButton>
                        <RatingButton>
                            <ThumbDownAltOutlinedIcon/>
                        </RatingButton>
                        <RatingButton>
                            reply
                        </RatingButton>
                    </GroupingDiv>
                </GroupingDiv>
            </Comment>
            <Comment>
                <ChannelImage src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}/>
                <GroupingDiv>
                    <CommentWrapper>
                        <ChannelName>
                            Test User
                        </ChannelName>
                        <DateAdded>
                            3 days ago,
                        </DateAdded>
                    </CommentWrapper>
                    Comment
                    <GroupingDiv style={{display: "flex", gap: "5px", paddingTop: "10px"}}>
                        <RatingButton>
                            <ThumbUpAltOutlinedIcon/>
                            6
                        </RatingButton>
                        <RatingButton>
                            <ThumbDownAltOutlinedIcon/>
                        </RatingButton>
                        <RatingButton>
                            reply
                        </RatingButton>
                    </GroupingDiv>
                </GroupingDiv>
            </Comment>
        </Container>
    );
};

export default VideoComments;