import React, { useState, useEffect } from "react";
import Axios  from "axios";
import '../../App.css';
//importazione contatori
import Counter from "../../assets/Raggruppa 21";
//icona account
import AccountImage from "../../assets/account.png"
//logo TOMATIME
import Logo from "../../assets/Logo.png";
//bottone play
import PlayButton from "../../assets/play";
//rettangolo che contiene la task in corso
import WorkingAt from "../../assets/work_at";
//modale per la crezione di una nuova task
import CreateTask from "../Modal/index";
// tasto per riposrtare in TO DO una task in corso
import ToDo from "../../assets/toDo";
// tasto per portare in DONE una task in corso
import Done from "../../assets/done";
import Visualizza from "../visualizza/visualizza";
import axios from "axios";
const API = "http://localhost:3000/task";


function Home() {
    const [Tasks, setTasks] = useState(null);

    // React.useEffect(() => {
    //     axios.get(API)
    //         .then((Response) => {
    //             setTasks(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("errore: ", error);
    //         });
    // }, []);






    const titoli = ["read email", "buy tickets"]; //array con i titoli delle tasks
    //(da controllare) funzione per settare il timer
    function Countdown() {
        
        const [seconds, setSeconds] = useState(25 * 60); //25 min in secondi 
        const [isActive, setIsActive] = useState(false);
        // constrollo se il pomodoro è attivo
        function toggle() {
            setIsActive(!isActive);
        }

        useEffect(() => {
            let interval = null;
            if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
            } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [isActive, seconds]);

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return (
            <>
                {/* formato minuti : secondi */}
                <h1>{minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</h1>
                {/* bottone PLAY */}
                <PlayButton  />
            </>
        )
    }

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
            {/* TO DO */}
            <div className="tasks_to_do">
                    <span>TO DO</span>
                    {titoli.map((element) => {
                        return <Visualizza task_title={element}/>
                    })}
                {/* ADD TASK */}
                <CreateTask />
            </div>
            {/* sezione rettangolo giallo */}
            <div className="time_to_focus">
                <span>TIME TO FOCUS</span>
                {/* TIMER */}
                <Countdown />
                <p>NEXT: SHORT BREAK (+5 MIN)</p>
                {/* WORKING AT */}
                <div className="work_at">
                    <p>WORKING AT</p>
                    <WorkingAt />
                    <div className="todo_done_btn">
                        {/* return to TO DO */}
                        <ToDo  />
                        {/* return to DONE */}
                        <Done />
                    </div>    
                </div>
            </div>
            {/* DONE */}
            <div className="tasks_done">
                <span>DONE</span>
            </div>
        </section>
    </>
    );
}
export default Home;