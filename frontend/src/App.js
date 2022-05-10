import { BrowserRouter } from "react-router-dom";
import React from "react";

// Components
import Footer from "./components/_layout/Footer/Footer";
import Header from "./components/_layout/Header/Header";
import Main from "./components/_layout/Main/Main";
import Navigation from "./components/_layout/Navigation/Navigation";
import Routes from "./components/routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Navigation />
      <Main>
        <Routes />
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
