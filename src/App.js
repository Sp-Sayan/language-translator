import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LangSelect from "./components/LangSelect/LangSelect";
import Preview_Page from "./components/Preview_Page/Preview_Page";
import MainVideoBg from "./assets/main-bg.mp4";
import Footer from "./components/Footer/Footer";

export const Preview = React.createContext();
function App() {
  const [isPreview, setIsPreview] = useState(true);
  return (
    <div>
      <Preview.Provider value={[isPreview, setIsPreview]}>
        {isPreview ? (
          <Preview_Page />
        ) : (
          <div className="container">
            <video preload="auto" autoPlay loop muted className="bg-video" src={MainVideoBg} />
            <Header />
            <LangSelect />
            <Footer />
          </div>
        )}
      </Preview.Provider>
    </div>
  );
}

export default App;
