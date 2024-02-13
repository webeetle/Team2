import React from "react";
import Freccia from "../../assets/rightarrows_87880.png";
import Verificato from "../../assets/verificato";
function Visualizza(props) {
    const {task_title} = props;
    return (
        <>
            <div className="Task1">
            <button class="task1">
                    <Verificato /> <p>{task_title}</p>
                            <img src={Freccia} alt="Freccia" className='freccia' />
                        </button></div>
            
        </>
    )
}
export default Visualizza;