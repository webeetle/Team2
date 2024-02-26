import React, {useState,useEffect} from "react";
import axios from "axios";
import Play from "./play";
//bottone play
import PlayButton from "../../assets/play";
import Next from "./next";
function Countdown(props) {
    const { email } = props; 
    const [currentStep, setCurrentStep] = useState(1);
    const [lc, setlc] = useState([])
    const [Duration, setDuration] = useState()
    const {onToggleHome, isActiveHome = false} = props
    const [seconds, setSeconds] = useState(0);//25 min in secondi 
    const [isActive, setIsActive] = useState(false);
    // constrollo se il pomodoro è attivo
    function toggle() {
        //setIsActive(!isActive);
        onToggleHome();
    }
    const remSeconds = async () =>{
        const response = await axios.get(`http://localhost:3000/lifecircle/${email}`);
        const results = response.status;
        if (results == 200) {
            console.log(response.data);
            
        }
    }
    
    const GetFristTimer = async () => {
        const response = await axios.post(`http://localhost:3000/lifecircle/StartAndRestartTimer`,  {email} );
        const results = response.status;
        if (results == 200) {
            console.log(response.data);
            setCurrentStep(response.data.step);
            console.log("currentStep",response.data.step)
            const firststep = response.data.firstTime;
            setlc(firststep)
            const [duration] = firststep.map((element)=>{return element.duration});
            setSeconds(duration*60)
            console.log("duration prova",duration*60);
            
        }
        
    
    }
    const createPomodoro = async ()=>{
        const response = await axios.post(`http://localhost:3000/tomato/`, {email, 'currentStep': Number(currentStep)});
        const results= response.status;
        if( results == 200){
            console.log(response.data);
        }
    }
    const getTimerNextStep = async ()=>{ 
        const response = await axios.post(`http://localhost:3000/lifecircle/getTimerNextStep`,  {email, 'step': Number(currentStep)} );
        const results = response.status;
        if (results == 200) {
            console.log(response.data);
            setCurrentStep(response.data.step)
            const stepAttuale= response.data.duration;
            setlc(stepAttuale)
            const [duration]= stepAttuale.map((element)=>{return element.duration});
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", currentStep, duration);
            setSeconds(duration*60)
            createPomodoro();
        }
    }
    const Tomato = async () => {
        const response = await axios.post(`http://localhost:3000/tomato/tomato`,{email, 'step': Number(currentStep)} );
        const results = response.status;
        if (results == 200) {
            console.log(response.data);
        }
    }
    
    
    useEffect(()=>{
        GetFristTimer();
        remSeconds();
    },[])
    useEffect(() => {
        let interval = null;
        if (isActiveHome && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (isActiveHome && seconds <= 0) {
            clearInterval(interval);
            getTimerNextStep();
            Tomato();
        }
        return () => {clearInterval(interval);}
    }, [isActiveHome,seconds]);
    
   
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (

        <>
            {/* formato minuti : secondi */}
            <h1>{minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}</h1>
            {/* bottone PLAY */}
            <Play email={email} currentStep={currentStep} onToggleCountdown={toggle} isActiveHome={isActiveHome} reset={GetFristTimer} createPomodoro={createPomodoro}/>
            <Next email={email} currentStep={currentStep}/>
        </>
    )
}
export default Countdown;