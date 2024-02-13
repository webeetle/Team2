import React from "react";
import Freccia from "../../../assets/rightarrows_87880.png";
import Pin from '../../../assets/pin'
import Modify from "../../../assets/modify";
function Step(props) {
    const {step_title} = props;
    return (
        <>
            <div className="Task1">
            <button class="task1">
                    <Pin /> <p>{step_title}</p>
                            <Modify />
                        </button></div>
            
        </>
    )
}
export default Step;
