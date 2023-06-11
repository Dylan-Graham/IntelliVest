import { useState } from "react";
import "./ToggleSwitch.css";

export const ToggleSwitch = ({ state, updateState }: any) => {
  const handleChange = () => {
    updateState(!state);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" defaultChecked={state} onChange={handleChange} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
