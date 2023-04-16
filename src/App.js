import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
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
import SignIn from "./pages/SignIn";
import Menu from "./components/Menu";
import Search from "./pages/Search";

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
    const [openMenu, setOpenMenu] = useState(false);

    const menu = () => {
        if (openMenu) {
            return <Menu darkMode={darkMode} setDarkMode={setDarkMode} setOpenMenu={setOpenMenu}/>;
        }
    }

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <BrowserRouter>
                <Container>
                    <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
                    {menu()}
                    <Main>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Home type={"explore"} darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                                <Route path={"trend"} element={<Home type={"trend"} darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                                <Route path={"subscription"} element={<Home type={"subscription"} darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                                <Route path={"search"} element={<Search darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                                <Route path="video">
                                    <Route path=":id" element={<Video/>}/>
                                </Route>
                                <Route path={"signIn"} element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
                            </Route>
                        </Routes>
                    </Main>
                </Container>
            </BrowserRouter>
        </ThemeProvider>
  );
}

export default App;
