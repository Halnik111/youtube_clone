import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import {darkTheme, lightTheme} from "./utils/Theme";
import {ThemeProvider} from "styled-components";
import {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";

const Container = styled.div `
  flex: 1;
  background-color: ${({theme}) => theme.bg};
  height: 100vh;
`;

const Main = styled.div `
  display: flex;
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
`;
const Wrapper = styled.div `
    padding: 22px 85px;
`;


function App() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <BrowserRouter>
            <Container>
                <Navbar/>
                <Main>
                    <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
                    <Wrapper>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Home/>}/>
                                <Route path="video">
                                    <Route path=":id" element={<Video/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </Wrapper>
                </Main>
            </Container>
            </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
