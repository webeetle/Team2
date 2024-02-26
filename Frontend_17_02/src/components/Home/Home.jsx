import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskWork } from "../../global";
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
import To_Done from "../../assets/done";
import Done from "../Done/index";
import Visualizza from "../visualizzaToDo/visualizza";




function Home(props) {
    const [NextStep, setNextStep] = useState([]);
    const [tasksToDo, setTasksToDo] = useState([]) //array contenente le tasks
    const [taskWorkOn, setTaskWorkOn] = useState([])
    const [active, setactive] = useState(false);
    const [taskDone, setTaskDone] = useState([]) 
    const email =  {email:"peppe@gmail.com"} ;
    
    const fetchTaskToDo = async () => {
    const response = await axios.post(`http://192.168.1.11:3000/task/todo`,email);
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTasksToDo(response.data)}
        
    
    }
    useEffect(() => {
        fetchTaskToDo();
    }, []);
    const fetchTaskWorkOn = async () => {
    const response = await axios.post(`http://192.168.1.11:3000/task/workingat`,email);
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTaskWorkOn(response.data);
        console.log("prova", taskWorkOn);
        // setTaskWorkOn(taskWorkOn.map((element) => { return element }));
        // console.log("prova22222",taskWorkOn)
        }
        
        
    
}
    useEffect(() => {
        fetchTaskWorkOn();
    }, []);
    const fetchTaskDone = async () => {
    const response = await axios.post(`http://192.168.1.11:3000/task/done`,email);
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTaskDone(response.data)}
        
    
}
    useEffect(() => {
        fetchTaskDone();
    }, []);
    function fetchTasks() {
        fetchTaskToDo();
        fetchTaskWorkOn();
        fetchTaskDone();
    }
    const UserInfo = props;
    console.log("user loggato: ", UserInfo);
    function check() {
        if(taskWorkOn.lenght>0){return true}else{return false}
    }
    const nextStep = async () => {
        const response = await axios.post(`http://192.168.1.11:3000/lifecircle/nextstep`,{'email': 'peppe@gmail.com','step':'1'});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setNextStep(response.data)}
    }
    useEffect(() => {
        nextStep();
        
    }, []);
    // React.useEffect(() => {
    //     axios.get(API)
    //         .then((Response) => {
    //             setTasks(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("errore: ", error);
    //         });
    // }, []);

    



    //(da controllare) funzione per settare il timer
    function Countdown() {
        
        const [seconds, setSeconds] = useState(1 * 60); //25 min in secondi 
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
            } else if (!isActive && seconds <= 0) {
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
                <PlayButton active={toggle} />
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
                    {console.log(tasksToDo)}
                    { tasksToDo.map((element) => { 
                        if (element != "null") return <Visualizza fetchTaskToDo={fetchTasks} task_title={element.name} id={element.id} />
                    })}
                {/* ADD TASK */}
                <CreateTask fetchTaskToDo={fetchTasks} />
            </div>
            {/* sezione rettangolo giallo */}
            <div className="time_to_focus">
                <span>TIME TO FOCUS</span>
                {/* TIMER */}
                <Countdown />
                    {NextStep.map((element) => { if (element != "null") return <p>NEXT: {element.name.toUpperCase()} ( +{element.duration} MIN )</p> })}
                {/* WORKING AT */}
                <div className="work_at">
                        <p>WORKING AT</p>
                        <section id="workingTask"><WorkingAt p={taskWorkOn.map((element) => { if (element != "null") console.log(element);return ( element.name)})} /></section>
                    <div className="todo_done_btn" id="todo_done_btn">
                            {/* return to TO DO */}
                            <ToDo active={check} email={email.email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} fetchTasks={fetchTasks} />
                        {/* return to DONE */}
                        <To_Done active={check} email={email.email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} fetchTasks={fetchTasks} />
                    </div>    
                </div>
            </div>
                {/* DONE */}
                <span className="doneSpan">DONE</span>
            <div className="tasks_done">
                    { taskDone.map((element) => { 
                        if (element != "null") return <Done task_title={element.name} id={element.id} />
                    })}
            </div>
        </section>
    </>
    );
}
export default Home;