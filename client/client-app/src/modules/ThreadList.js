import { useState, useContext, createContext } from "react";
import { ScreenStateContext } from "../App.js";

import ThreadButton from "./ThreadButton.js";
import ReplyList from "./ReplyList.js";
import ThreadReply from "./ThreadReply.js";
import ThreadPage from "../ThreadPage.js";

export const stateContext = createContext(0);

export default function ThreadList() {
    const [listActive, activateList] = useState(false);
    const switchScreen = useContext(ScreenStateContext);

    try {
    const [expandedThread, setExpandedThread] = useState(null);


    function handleExpand(value) {
        if (expandedThread === value) {
            setExpandedThread(null);
            //target.classList.remove("expanding");
        } else {
            setExpandedThread(value);
            //target.classList.add("expanding");
        }
    }


    function closeExpand(event) {
        const target = event.currentTarget.closest(".grid-item");
        event.stopPropagation();
        setExpandedThread(null);
        target.classList.remove("expanding");
    }


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
            return (
                <div className="Home">
                    <div className="nav-space"></div>
                    <div className="grid-container">
                        {values.map( (value, key) => (
                            <div
                                className={`grid-item ${expandedThread === value ? "expanding" : "not-expanded"}`}
                            >

                            <stateContext.Provider value ={handleExpand}>
                                <ThreadButton value={value} key={key}/>
                            </stateContext.Provider>
        
                                    <div className="expanded-content">
                                        <ThreadPage />
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else {
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