import React from "react";

import "./PageCard.css";

function PageCard({className, title, subtitle, content}){
    return(

            <div className="page-card">
                <h1><u>{title}</u></h1>
                <p><b>{subtitle}</b></p>
                <div className="content">{content}</div>
            </div>


    )
}

export default PageCard;