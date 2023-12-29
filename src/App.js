import "./App.css";
import Header from "./components/Header/Header";
import LangSelect from "./components/LangSelect/LangSelect";
import { TextContext } from "./components/Translation/Translation";


function App() {

  return (
    <div className="container">

      <Header />
      <LangSelect />

    </div>
  );
}

export default App;
