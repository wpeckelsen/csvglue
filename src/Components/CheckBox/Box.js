import React from "react";
import "../../App.css";
import "./Box.css";

function Box({ description, checked, handleChange }) {
    return (
        <label className="box">
            <input
                className="check"
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            <p>{description}</p>
        </label>
    );
}

export default Box;
