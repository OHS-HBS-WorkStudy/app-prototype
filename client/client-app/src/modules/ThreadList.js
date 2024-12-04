import { useState, useContext } from "react";

import { ScreenStateContext } from "../App.js";
import DOMPurify from 'dompurify';

//import ThreadButton from "./ThreadButton.js";

export default function ThreadList() {
    const [listActive, activateList] = useState(false);
    try{
        let isThereSearch = sessionStorage.getItem("search_tag");

        if(isThereSearch === "" || isThereSearch === null || isThereSearch === undefined) {
            getListNone();
        }else {
            getListOne(isThereSearch);
        }

        let test;

        function setList(json) {
            console.log(json);
            test = json;
            console.log(test);
            sessionStorage.setItem("threads", JSON.stringify(test));
            activateList(true);
        }

        function getListNone() {
            fetch(sessionStorage.getItem("server_address")+"/threadList")
                .then((response) => response.json())
                .then((json) => setList(json))
                .catch((error) => {
                    console.log(error);
                })
        }
        
        function getListOne(val) {
            fetch(sessionStorage.getItem("server_address")+"/searchTag", {
                method: "POST",
                body: JSON.stringify({
                    tag: val
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then((response) => response.json())
            .then((json) => setList(json))
            .catch((error) => {
                console.log(error);
            })
        }

        //getList(isThereSearch);

        if(listActive === true) {
            let values = JSON.parse(sessionStorage.getItem("threads"));
            return(
                <body>
                    <div className="Home">
                        <div className="nav-space"></div>
                            <div className="grid-container">
                                {values.map(value => 
                                    <ThreadButton value={value} />
                                )} 
                        </div>
                    </div>
                </body>
                
            ) 
        }else {
            return(
                <div>
                     <div className="nav-space"></div>
                    <h2>No current Threads</h2>
                </div>
            )
        }
    }catch(err){
        return(
            <div>
                 <div className="nav-space"></div>
                <h2>No current Threads</h2>
            </div>
        )
    }
}

function ThreadButton({value}) {
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