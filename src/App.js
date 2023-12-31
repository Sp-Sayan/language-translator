import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LangSelect from "./components/LangSelect/LangSelect";
import Preview_Page from "./components/Preview_Page/Preview_Page";

export const Preview = React.createContext();
function App() {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <div>
      <Preview.Provider value={[isPreview, setIsPreview]}>
        {isPreview ? (
          <Preview_Page />
        ) : (
          <div className="container">
            <Header />
            <LangSelect />
          </div>
        )}
      </Preview.Provider>
    </div>
  );
}

export default App;
