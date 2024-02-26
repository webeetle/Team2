import React, { useState, useEffect } from "react";
import Axios  from "axios";
import './index.css';
//importazione contatori
import Counter from "../../assets/Raggruppa 21";
//icona account
import AccountImage from "../../assets/account.png"
//logo TOMATIME
import Logo from "../../assets/Logo.png";
// gli step
import Step from "./step/step";
import CreateTask from "../Modal/index"
import Button from "../lifecycle/button/button"
import Tomato from "../../assets/Tomato.png"
function LyfeCycle() {
    const step = ["pomodoro", "pausa breve", "pomodoro", "pausa breve", "pomodoro", "pausa lunga"];
    return (
        <>
        {/* intestazione */}
        <section className="hero-section">
            {/* logo TOMATIME */}
            <img src={Logo} alt="Tomatime" className='logo_home' />
            {/* contatori  */}
            <Counter />
            {/* icona account */}
            <img src={AccountImage} alt="User Image" className="AccountImg" />
        </section>
        {/* Kanban board */}
            <section className="kanbanBoard">
                <div className="step">
                    <span>LYFE CYCLE</span>
                {step.map((element) => { return <Step step_title={element} />})}
                </div>
                <img src={Tomato} alt="tomato" className="tomatoStep"/>
                <div className="buttons">
                    <Button name="ADD STEP" classe={"addStep"}  fillSVG="#d9391e"  />
                    <br /><br /><br /><br />
                    <Button name="SAVE" classe={"save"} fillSVG="#ffffff" />
                    <br /><br /><br /><br />
                    <Button name="RESTORE" fillSVG="#d9391e" classe={"ripristina"} />
                </div>
            </section>
        </>
    )
}
export default LyfeCycle;