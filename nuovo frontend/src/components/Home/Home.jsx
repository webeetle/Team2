import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../../App.css';
//importazione contatori
import Counter from "../../assets/Raggruppa 21";
//icona account
import AccountImage from "../../assets/account.png"
//logo TOMATIME
import Logo from "../../assets/Logo.png";

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
import Countdown from "../timer/countdown";
import { Transition } from "react-transition-group";
import TomatoPic from '../../assets/Tomato.png'




function Tomato(props) {
    const { isActiveHome = false } = props;

    return (
         <Transition in={isActiveHome} timeout={500}  style={{zIndex: -1}}>
            {state => (
                <div className={`tomato-container   ${state}`}>
                    <img src={TomatoPic} alt="Tomato" className=""  />
                </div>
            )}
        </Transition>
    );
}






function Home() {
    
    const [tasksToDo, setTasksToDo] = useState([]) //array contenente le tasks
    const [taskWorkOn, setTaskWorkOn] = useState([])
    
    const [taskDone, setTaskDone] = useState([]) 
    //const email =  {email:"peppe@gmail.com"} ;
    const [isActiveHome, setIsActiveHome] = useState()

    function toggleHome() {
        setIsActiveHome(!isActiveHome);
    }

    const { email } = useParams();
    console.log("email prova", email)
    
    const fetchTaskToDo = async () => {
    const response = await axios.post(`http://localhost:3000/task/todo`,{email});
    const results = response.status;
    if (results == 200) {
        console.log(response.data);
        setTasksToDo(response.data)}
        
    
    }
    useEffect(() => {
        fetchTaskToDo();
    }, []);
    const fetchTaskWorkOn = async () => {
    const response = await axios.post(`http://localhost:3000/task/workingat`,{email});
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
    const response = await axios.post(`http://localhost:3000/task/done`,{email});
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
    function check() {
        if(taskWorkOn.lenght>0){return true}else{return false}
    }
    
    // React.useEffect(() => {
    //     axios.get(API)
    //         .then((Response) => {
    //             setTasks(response.data);
    //         })
    //         .catch((error) => {
    //             console.error("errore: ", error);
    //         });
    // }, []);
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
                        if (element != "null") return <Visualizza desc={element.description} email={email} fetchTaskToDo={fetchTasks} task_title={element.name} id={element.id} />
                    })}
                {/* ADD TASK */}
                    <CreateTask fetchTaskToDo={fetchTasks} email={ email} />
            </div>
                {/* sezione rettangolo giallo */}
            <div>
            <Tomato isActiveHome={isActiveHome}  />
                    <div className="time_to_focus" >
                        <span>TIME TO FOCUS</span>
                        {/* TIMER */}
                        <Countdown  email={ email}  onToggleHome={toggleHome} isActiveHome={isActiveHome} />
                    
                {/* WORKING AT */}
                <div className="work_at">
                        <p>WORKING AT</p>
                        <section id="workingTask"><WorkingAt p={taskWorkOn.map((element) => { if (element != "null") console.log(element);return ( element.name)})} /></section>
                    <div className="todo_done_btn" id="todo_done_btn">
                            {/* return to TO DO */}
                            <ToDo active={check} email={email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} fetchTasks={fetchTasks} />
                        {/* return to DONE */}
                        <To_Done active={check} email={email} id={taskWorkOn.map((element) =>{ if (element != "null") console.log(element);return ( element.id)})} fetchTasks={fetchTasks} />
                    </div>    
                </div></div>
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