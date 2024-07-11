import React, { useState } from "react";
// import SettingsContainer from "./SettingsContainer";
import "./themes.scss";
import useUserSettings from "./useUserSettings";

// function Settings() {
//   let [show, setShow] = useState(false);

//   return show ? (
//     <div className="settings">
//       <SettingsContainer />
//     </div>
//   ) : (
//     <div className="settings">
//       <button onClick={() => { setShow(true) }}>
//         settings
//       </button>
//     </div>
//   )
// }

function Settings() {
  let settings = useUserSettings();
  return <div></div>
}

export default Settings;