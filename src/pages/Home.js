import React from 'react';
import styled from "styled-components";
import Card from "../components/Card";
import Menu from "../components/Menu";

const Container = styled.div`
  height: fit-content;
  display: grid;
  gap: 20px;
  margin-right: 55px;
  margin-left: 295px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-template-rows: 1fr;
  
  @media screen and (min-width: 1380px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
`;

const ContentWrapper =  styled.div`
  width: 100%;
  margin-top: 80px;
`;


const Home = ({darkMode, setDarkMode}) => {
    return (
        <ContentWrapper>
            <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Container>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </Container>
        </ContentWrapper>

    );
};

export default Home;