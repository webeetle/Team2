import React, {useContext, useEffect, useState} from "react";
import Guard from "./guard.jsx";
import mycontext from "../../../contexts/mycontext.jsx";

function Counter(props){
    const [count, setCount] = useState(0);
    const [refresh, setRefresh] = useState(0);
    var double = count * 2;
    
    const theme = useContext(mycontext);
    console.log(theme);

    useEffect( () => {
        console.log('useEffect', refresh);
        setCount(0);
    }, [refresh]);

    function increment(){
        setCount(count + 1);
        setCount((prevState) => {
            return prevState + 1;
        });
    }

    function decrement(){
        setCount(count - 1);
    }

    return (
        <>  
            <div>
                <button onClick={decrement}>-</button>
                <button onClick={increment}>+</button>
                <button onClick={() => { setRefresh(refresh + 1) }}>Refresh</button>
            </div>
            <div>{count}</div>
            <div>{double}</div>
            <Guard 
                count = {count}
                onCountExceed = {() => {
                    setCount(0);
                    alert("Too much!");
                }}
            />
        </>
    );
}

export default Counter;