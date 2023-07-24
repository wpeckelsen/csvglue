import React from "react";
import "./Button.css";

function Button({content, type, click, change}) {
    return (
        <button type={type} onClick={click} onChange={change}>
            <span className="button-text">{content}</span>
        </button>
    );
}

export default Button;