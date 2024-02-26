import React from "react";
import Freccia from "../../../assets/rightarrows_87880.png";
import Pin from '../../../assets/pin'
import Modify from "../../../assets/modify";
function Step(props) {
    const {step_title} = props;
    return (
        <>
            <div className="SingleStep">
            <button class="singleStep">
                    <Pin /> 
                    <div>
                        <p>{step_title}</p>
                        <span>duration (+25min)</span>
                    </div>
                    {/* <Modify /> */}
                    <img src={Freccia} className="modify" />
                        </button></div>
            
        </>
    )
}
export default Step;
