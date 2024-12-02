import { useContext } from "react";

import { ScreenStateContext } from "../App.js";
import DOMPurify from 'dompurify';

export default function ThreadButton({value}) {
    const switchScreen = useContext(ScreenStateContext);

    function toThreadPage(json) {
        console.log(json);
        sessionStorage.setItem("thread", JSON.stringify(json));

        switchScreen(3);
    }
    function getThreadData() {
        fetch("http://127.0.0.1:8000/retrieveThread", {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "ngrok-skip-browser-warning": "69420"
            }
        })
        .then((response) => response.json())
        .then((json) => toThreadPage(json));
    }

    const stripHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
      };

    const sanitizedName = DOMPurify.sanitize(value.name);
    const sanitizedContents = DOMPurify.sanitize(value.content);
    return(

    
            <div className="grid-item" onClick={getThreadData} >
                
                    <div className="vote-counter">2</div>
                        <div className="grid-item-content"> 
                            <div className="grid-item-title">
                                {stripHTML(sanitizedName)}
                            </div>
                            <div className="grid-item-desc">
                                {stripHTML(sanitizedContents)}
                            </div>
                </div>
            </div>

    )
}