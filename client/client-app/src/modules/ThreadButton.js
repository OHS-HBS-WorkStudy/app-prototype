import { useContext } from "react";

import { ScreenStateContext } from "../App.js";

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
    return(
        <div onClick={getThreadData}>
            <h2>{value.name}</h2>
        </div>
    )
}