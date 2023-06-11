import { useState } from "react";
import "./App.css";
import { Stock } from "./components/Stock";
import { ToggleSwitch } from "./components/ToggleSwitch";

function App() {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <div
      className={
        darkTheme === true ? "App App-dark-theme" : "App App-light-theme"
      }
    >
      <div className="header">
        <div className="title">IntelliVest 📈</div>
        <ToggleSwitch state={darkTheme} updateState={setDarkTheme} />
      </div>
      <Stock />
    </div>
  );
}

export default App;
