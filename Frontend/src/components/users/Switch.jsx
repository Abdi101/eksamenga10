import { useEffect ,useState } from 'react';
//switch code from https://www.youtube.com/watch?v=bztDMD4HSL0

const Switch = ({isToggled, onToggle}) => {


    return (
    <div className="switchWrapper">
        <label htmlFor="admin"><span className="labelText">Admin</span>
        <span className="switch">
        <input className="modalInput" type="checkbox" id="admin" name="admin" checked={isToggled} onChange={onToggle}/>
        <span className="slider"/></span>
        </label>
    </div>
    )
}

export default Switch;
