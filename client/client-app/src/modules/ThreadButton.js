import { useContext, createContext } from "react";

import { ScreenStateContext } from "../App.js";
import { stateContext } from "./ThreadList.js";
import DOMPurify from 'dompurify';

export default function ThreadButton({value, key}) {
    const switchScreen = useContext(ScreenStateContext);
    const setExpandedThread = useContext(stateContext);

    function toThreadPage(json) {
        console.log(json);
        sessionStorage.setItem("thread", JSON.stringify(json));

        switchScreen(3);
    }

    function saveThread(json) {
        console.log(json);
        sessionStorage.setItem("thread", JSON.stringify(json));
        setExpandedThread(value);
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
        .then((json) => saveThread(json));
    }

    const sanitizedName = DOMPurify.sanitize(value.name);
    const sanitizedContents = DOMPurify.sanitize(value.content);

    return(
        <div onClick={getThreadData}>
            <div dangerouslySetInnerHTML={{__html: sanitizedName  }} > 
            </div>
            <div dangerouslySetInnerHTML={{__html: sanitizedContents  }} />
        </div>
    )
}