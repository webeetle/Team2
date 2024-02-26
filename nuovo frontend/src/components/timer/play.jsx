import React from "react";
import axios from "axios";
import StopButton from "../lifecycle/button/StopButton";
//bottone play

import PlayButton from "../../assets/play";
function Play(props) {
    const { email, currentStep, reset, createPomodoro, onToggleCountdown, isActiveHome = false } = props;
    
    const togglePlay = () => {
        onToggleCountdown();
       // setShowPlay(!showPlay);
    };

    return (
        <div>
            {!isActiveHome ?
                <PlayButton active={togglePlay} createPomodoro={createPomodoro}/>
                : <StopButton reset={reset} active={togglePlay} email={email} currentStep={currentStep}/>}
        </div>
    );
}
export default Play;