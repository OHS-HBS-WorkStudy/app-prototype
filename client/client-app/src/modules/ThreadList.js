import { useState, useContext, useEffect } from "react";
import { ScreenStateContext } from "../App.js";
import DOMPurify from 'dompurify';

export default function ThreadList({value}) {
    const [listActive, activateList] = useState(false);


    


    

    try{
        let isThereSearch = sessionStorage.getItem("search_tag");

        if(isThereSearch === "" || isThereSearch === null || isThereSearch === undefined) {
            getListNone();
        }else {
            getListOne(isThereSearch);
        }

        let test;
    

        {/* JSON LIST*/}
        function setList(json) {
            console.log(json);
            test = json;
            console.log(test);
            sessionStorage.setItem("threads", JSON.stringify(test));
            activateList(true);
        }

        function getListNone() {
            fetch("http://127.0.0.1:8000/threadList")
                .then((response) => response.json())
                .then((json) => setList(json))
                .catch((error) => {
                    console.log(error);
                })
        }
        
        function getListOne(val) {
            fetch("http://127.0.0.1:8000/searchTag", {
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
                <div>
                <div className="nav-space"></div>
                    <div className="Home">

                    <div className="container1">
                        <div className="leftextra">
                            <h1>Thread History</h1>
                            <div className="leftextracontent">
                                    <p>No threads viewed yet</p>
                            </div>
                        </div>
{/* 
                        <div className="leftextra">
                            <h1>Thread Created</h1>
                            <div className="leftextracontent">
                                    <p>No threads viewed yet</p>
                            </div>
                        </div> */}


                        <div className="grid-container">
                            {values.map(value => 
                                <ThreadButton value={value} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
                
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
        console.log("err");
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