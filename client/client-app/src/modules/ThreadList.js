import { useState } from "react";

import ThreadButton from "./ThreadButton.js";

export default function ThreadList() {
    const [listActive, activateList] = useState(false);
    let test;

    function setList(json) {
        console.log(json);
        test = json;
        console.log(test);
        sessionStorage.setItem("threads", JSON.stringify(test));
        activateList(true);
    }
    
    function getList() {
        fetch("http://127.0.0.1:8000/threadList")
        .then((response) => response.json())
        .then((json) => setList(json))
    }

    getList();

    if(listActive === true) {
        let values = JSON.parse(sessionStorage.getItem("threads"));
        return(
            <div>
                {values.map(value => 
                    <ThreadButton value={value} />
                )} 
            </div>
        ) 
    }else {
        return(
            <div>
                <h2>No current Threads</h2>
            </div>
        )
    }
}