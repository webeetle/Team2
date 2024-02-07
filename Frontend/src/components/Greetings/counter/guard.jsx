import React from "react";

function Guard({count, onCountExceed}){
    if(count > 5){
        onCountExceed();
    }
    return (
        <>
            <div>La conta è {count}</div>
            {count > 5 && <div>La conta è maggiore di 5</div>}
        </>
    );
}

export default Guard;