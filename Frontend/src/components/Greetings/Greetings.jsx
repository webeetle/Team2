import React from "react";

function Greetings( props ) {
    const { name } = props;
    return (
        <div>
            <strong> Ciao {name} </strong>
        </div>
    );
}

export default Greetings;