import { useState } from "react";

import ThreadButton from "./ThreadButton.js";

export default function ThreadList() {
    const [listActive, activateList] = useState(false);
    try{
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
            .catch((error) => {
                console.log(error);
            })
        }

        getList();

        if(listActive === true) {
            let values = JSON.parse(sessionStorage.getItem("threads"));
            return(
                <div className="grid-container">
                    {values.map(value => 
                        <ThreadButton value={value} className="grid-item"  />
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
    }catch(err){
        return(
            <div>
                <h2>No current Threads</h2>
            </div>
        )
    }
}