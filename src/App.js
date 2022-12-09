import styled from "styled-components";
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
  background-color: ${({theme}) => theme.bg};
  height: 100vh;
`;

const Main = styled.div `
  display: flex;
  background-color: ${({theme}) => theme.bg};
  color: ${({theme}) => theme.text};
`;


function App() {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <BrowserRouter>
                <Container>
                    <Navbar/>
                    <Main>
                            <Routes>
                                <Route path="/">
                                    //todo find better way to pass props
                                    <Route index element={<Home darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                                    <Route path="video">
                                        <Route path=":id" element={<Video/>}/>
                                    </Route>
                                </Route>
                            </Routes>
                    </Main>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
