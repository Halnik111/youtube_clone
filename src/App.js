import styled from "styled-components";
import Navbar from "./components/Navbar/Navbar";
import {darkTheme, lightTheme} from "./utils/Theme";
import {ThemeProvider} from "styled-components";
import {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Menu from "./components/Menu";
import Search from "./pages/Search";
import Account from "./pages/Account";

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
            <HashRouter>
                <Container>
                    <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu}/>
                    {menu()}
                    <Main>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Home type={"explore"} />}/>
                                <Route path={"trend"} element={<Home type={"trend"} />}/>
                                <Route path={"subscription"} element={<Home type={"subscription"} />}/>
                                <Route path={"search"} element={<Search />}/>
                                <Route path="video">
                                    <Route path=":id" element={<Video/>}/>
                                </Route>
                                <Route path={"signIn"} element={<SignIn />}/>
                                <Route path={"account"}>
                                    <Route path=":id" element={<Account/>}/>
                                </Route>
                            </Route>
                        </Routes>
                    </Main>
                </Container>
            </HashRouter>
        </ThemeProvider>
  );
}

export default App;
