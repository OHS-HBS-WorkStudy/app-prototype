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
        fetch(sessionStorage.getItem("server_address")+"/retrieveThread", {
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

    const sanitizedName = DOMPurify.sanitize(value.name);
    return(
        <div>
            <h2 onClick={getThreadData}  className="grid-item" dangerouslySetInnerHTML={{__html: sanitizedName  }} />
        </div>
    )
}